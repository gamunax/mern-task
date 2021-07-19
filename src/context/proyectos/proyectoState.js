import React, { useReducer } from 'react'

import { v4 as uuidv4 } from 'uuid';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
  AGREGAR_PROYECTO,
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  VALIDAR_FORMULARIO
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
    formulario: false
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

  return (
    <proyectoContext.Provider
      value={
        {
          proyectos: state.proyectos,
          formulario: state.formulario,
          mostrarFormulario,
          obtenerProyectos,
          agregarProyecto
        }
      }
    >
      {props.children}
    </proyectoContext.Provider>
  )
}
export default ProyectoState;