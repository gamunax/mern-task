import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_PROYECTOS,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  OBTENER_USUARIO
} from '../../types/index';
import clienteAxios from '../../config/axios';
import { tokenAuth } from '../../config/token';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = async datos => {
    try {
      console.log(datos);
      const respuesta = await clienteAxios.post('/api/usuarios', datos);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data
      });

      usuarioAutenticado();
    } catch (error) {
      // console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      });
    }
  }

  const usuarioAutenticado = async () => {
    console.log('1');
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get('api/auth');
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario
      });
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta
      });
    }
  }

  const iniciarSesion = async datos => {
    try {
      const respuesta = await clienteAxios.post('api/auth', datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      });
      usuarioAutenticado();
    } catch (error) {
      const err = error.response?.data;
      let alerta = { categoria: 'alerta-error'};
      if (err?.errors) {
        const [{ msg }] = err?.errors;
        alerta = {
          ...alerta,
          msg
        };
      } else {
        alerta = {
          ...alerta,
          msg: err?.msg
        };
      }
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta
      });
    }
  }

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    });
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {props.children}
    </authContext.Provider>
  )
}

export default AuthState;