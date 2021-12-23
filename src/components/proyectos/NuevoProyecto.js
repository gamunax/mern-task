import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError 
  } = proyectosContext;

  const [proyecto, guardarProyecto] = useState({
    name: ''
  });

  const { name } = proyecto;

  const onChangeProyecto = e => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    });
  }

  const onSubmitProyecto = e => {
    e.preventDefault();

    if (name === '') {
      mostrarError();
      return;
    };

    agregarProyecto(proyecto);

    guardarProyecto({
      name: ''
    });
  }

  const onClickFormulario = () => {
    mostrarFormulario();
  }

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>

      {
        formulario ?
          (
            <form
              className="formulario-nuevo-proyecto"
              onSubmit={onSubmitProyecto}
            >
              <input
                id="new-project"
                type="text"
                className="input-text"
                placeholder="Nombre proyecto"
                name="name"
                value={name}
                onChange={onChangeProyecto}
              />

              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Agregar proyecto"
              />
            </form>
          ) : null
      }

      { errorFormulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null}


    </Fragment>
  );
}

export default NuevoProyecto;