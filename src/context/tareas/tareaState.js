import React, { useReducer } from 'react';
import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA } from '../../types';

const TareaState = props => {
  const initialState = {
    tareas: [
      { nombre: 'Elegir Plataforma', estado: true, proyectoId: 1 },
      { nombre: 'Elegir Colores', estado: false, proyectoId: 2 },
      { nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: 3 },
      { nombre: 'Elegir Hosting', estado: true, proyectoId: 4 },
      { nombre: 'Elegir Plataforma', estado: true, proyectoId: 2 },
      { nombre: 'Elegir Colores', estado: false, proyectoId: 3 },
      { nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: 1 },
      { nombre: 'Elegir Hosting', estado: true, proyectoId: 2 },
      { nombre: 'Elegir Plataforma', estado: true, proyectoId: 1 },
      { nombre: 'Elegir Colores', estado: false, proyectoId: 3 },
      { nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: 3 },
      { nombre: 'Elegir Hosting', estado: true, proyectoId: 2 },
    ],
    tareasProyecto: null,
    errorTarea: false
  }

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  const obtenerTareas = proyectoId => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId
    });
  }

  const agregarTarea = tarea => {
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea
    })
  }

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    })
  }

  return (
    <tareaContext.Provider
      value={
        {
          tareas: state.tareas,
          tareasProyecto: state.tareasProyecto,
          errorTarea: state.errorTarea,
          obtenerTareas,
          agregarTarea,
          validarTarea
        }
      }
    >
      {props.children}
    </tareaContext.Provider>
  );
}

export default TareaState;