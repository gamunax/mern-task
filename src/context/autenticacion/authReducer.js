import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_PROYECTOS,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  OBTENER_USUARIO
} from '../../types/index';

export default (state, action) => {
  switch (action.type) {
  case  REGISTRO_EXITOSO:
    localStorage.setItem('token', action.payload.token);
    return {
      ...state,
      autenticado: true,
      mensaje: null,
      token: action.payload.token
    }
  case OBTENER_USUARIO:
    return {
      ...state,
      usuario: action.payload
    }
  case REGISTRO_ERROR:
    return {
      ...state,
      token: null,
      mensaje: action.payload
    }
    default:
      return state;
  }
}