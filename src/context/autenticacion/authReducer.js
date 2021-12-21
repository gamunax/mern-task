import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_PROYECTOS,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types/index';

export default (state, action) => {
  switch (action.type) {
  case  REGISTRO_EXITOSO:
    localStorage.setItem('token', action.payload.token);
    return {
      ...state,
      autenticado: true,
      message: null,
      token: action.payload.token
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