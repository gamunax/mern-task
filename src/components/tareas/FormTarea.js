import React, { useContext, useState, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    tareaSeleccionada,
    errorTarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    eliminarTareaSeleccionada
  } = tareasContext;

  useEffect(() => {
    if (tareaSeleccionada !== null) {
      guardarTarea(tareaSeleccionada);
    } else {
      guardarTarea({
        nombre: ''
      });
    }
  }, [tareaSeleccionada]);

  const [tarea, guardarTarea] = useState({
    nombre: ''
  });

  const { nombre } = tarea;

  if (!proyecto) return null;

  const { id: proyectoIdSeleccionado } = proyecto;

  const handleChange = e => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = e => {
    e.preventDefault();

    if (nombre.trim() === '') {
      validarTarea();
      return;
    }

    // is edit or is new task
    if (tareaSeleccionada) { // * edit task
      actualizarTarea(tarea);
      eliminarTareaSeleccionada();
    } else { // * new task
      tarea.proyectoId = proyectoIdSeleccionado;
      tarea.estado = false;
      agregarTarea(tarea);
    }

    obtenerTareas(proyectoIdSeleccionado);
    guardarTarea({ nombre: '' });
  }

  return (
    <div className="formulario">
      <form
        onSubmit={onSubmit}
      >
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
          />
        </div>
      </form>

      {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
    </div>
  );
}

export default FormTarea;