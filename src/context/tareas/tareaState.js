import React, { useReducer } from 'react';
import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import { v4 as uuidv4 } from 'uuid';

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {
  const initialState = {
    tareas: [
      { id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1 },
      { id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2 },
      { id: 3, nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: 3 },
      { id: 4, nombre: 'Elegir Hosting', estado: true, proyectoId: 4 },
      { id: 5, nombre: 'Elegir Plataforma', estado: true, proyectoId: 2 },
      { id: 6, nombre: 'Elegir Colores', estado: false, proyectoId: 3 },
      { id: 7, nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: 1 },
      { id: 8, nombre: 'Elegir Hosting', estado: true, proyectoId: 2 },
      { id: 9, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1 },
      { id: 10, nombre: 'Elegir Colores', estado: false, proyectoId: 3 },
      { id: 11, nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: 3 },
      { id: 12, nombre: 'Elegir Hosting', estado: true, proyectoId: 2 },
    ],
    tareasProyecto: null,
    errorTarea: false,
    tareaSeleccionada: null
  }

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  const obtenerTareas = proyectoId => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId
    });
  }

  const agregarTarea = tarea => {
    tarea.id = uuidv4();

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

  const eliminarTarea = id => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id
    })
  }

  const cambiarEstadoTarea = tarea => {
    dispatch({
      type: ESTADO_TAREA,
      payload: tarea
    });
  }

  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    })
  }

  const actualizarTarea = tarea => {
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: tarea
    })
  }

  const eliminarTareaSeleccionada = () => {
    dispatch({
      type: LIMPIAR_TAREA
    })
  }

  return (
    <tareaContext.Provider
      value={
        {
          tareas: state.tareas,
          tareasProyecto: state.tareasProyecto,
          errorTarea: state.errorTarea,
          tareaSeleccionada: state.tareaSeleccionada,
          obtenerTareas,
          agregarTarea,
          validarTarea,
          eliminarTarea,
          cambiarEstadoTarea,
          guardarTareaActual,
          actualizarTarea,
          eliminarTareaSeleccionada
        }
      }
    >
      {props.children}
    </tareaContext.Provider>
  );
}

export default TareaState;