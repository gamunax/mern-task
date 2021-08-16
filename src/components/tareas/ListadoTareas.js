import React, { useContext } from 'react'
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoTareas = () => {

  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  if (!proyecto) return <h2>Selecciona un proyecto</h2>

  const tareasProyecto = [
    { nombre: 'Elegir Plataforma', estado: true },
    { nombre: 'Elegir Colores', estado: false },
    { nombre: 'Elegir Plataforma de pago', estado: false },
    { nombre: 'Elegir Hosting', estado: true },
  ];

  const onClickEliminar = () => {
    eliminarProyecto(proyecto.id);
  }

  return (
    <>
      <h2>Proyecto: {proyecto?.nombre}</h2>
      <ul className="listado-tareas">
        {
          tareasProyecto.length === 0 ?
            (<li className="tarea"><p>No hay tareas</p></li>) :
            tareasProyecto.map(tarea => (
              <Tarea
                tarea={tarea}
              />
            ))
        }
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminar}
      >
        Eliminar Proyecto &times;
      </button>
    </>
  );
}

export default ListadoTareas;