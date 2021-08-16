import React, { useReducer } from 'react'

import { v4 as uuidv4 } from 'uuid';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
  AGREGAR_PROYECTO,
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO
} from '../../types';

const ProyectoState = props => {

  const proyectos = [
    { id: 1, nombre: 'Tienda Virtual' },
    { id: 2, nombre: 'Intranet' },
    { id: 3, nombre: 'Diseño de Sitio Web' },
    { id: 4, nombre: 'Mern' }
  ];

  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario: false,
    proyecto: null
  }

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    })
  };

  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos
    })
  };

  // * agregar proyecto
  const agregarProyecto = proyecto => {
    proyecto.id = uuidv4();

    dispatch({
      type: AGREGAR_PROYECTO,
      payload: proyecto
    });
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

  const eliminarProyecto = proyectoId => {
    dispatch({
      type: ELIMINAR_PROYECTO,
      payload: proyectoId
    });
  }

  return (
    <proyectoContext.Provider
      value={
        {
          proyectos: state.proyectos,
          formulario: state.formulario,
          errorFormulario: state.errorFormulario,
          proyecto: state.proyecto,
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