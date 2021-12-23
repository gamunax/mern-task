import React, { useReducer } from 'react'

// import { v4 as uuidv4 } from 'uuid';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
  AGREGAR_PROYECTO,
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  PROYECTO_ERROR,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO
} from '../../types';

import clienteAxios from '../../config/axios';

const ProyectoState = props => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario: false,
    proyecto: null,
    mensaje: null
  }

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    })
  };

  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/proyectos');
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data?.proyectos
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });
    }
  };

  // * agregar proyecto
  const agregarProyecto = async proyecto => {
    // proyecto.id = uuidv4();

    try {
      const resultado = await clienteAxios.post('/api/proyectos', proyecto);
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });
    }

    
  }

  // * validar el formulario por errores
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    });
  }

  const proyectoActual = proyectoId => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    });
  }

  const eliminarProyecto = async proyectoId => {
    try {
      await clienteAxios.delete(`api/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });
    }

  }

  return (
    <proyectoContext.Provider
      value={
        {
          proyectos: state.proyectos,
          formulario: state.formulario,
          errorFormulario: state.errorFormulario,
          proyecto: state.proyecto,
          mensaje: state.mensaje,
          mostrarFormulario,
          obtenerProyectos,
          agregarProyecto,
          mostrarError,
          proyectoActual,
          eliminarProyecto
        }
      }
    >
      {props.children}
    </proyectoContext.Provider>
  )
}
export default ProyectoState;