import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ component: Component, ...props }) => {
  console.log(props);
  const authContext = useContext(AuthContext);
  const { autenticado, usuarioAutenticado, cargando } = authContext;

  useEffect(() => {
    usuarioAutenticado();
  }, [])

  return (
    <Route {...props} render={props => !autenticado && !cargando
      ? (<Redirect to="/" />)
      : (<Component {...props} />)}
    />
  )
}

export default RutaPrivada;