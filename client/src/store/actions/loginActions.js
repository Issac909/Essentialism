import { axiosWithAuth } from "../../utils/axiosWithAuth";
import history from '../../history';

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGOUT_CLICKED = "LOGOUT_CLICKED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const login = credentials => dispatch => {
  dispatch({ type: LOGIN_START });
  return axiosWithAuth()
    .post("api/auth/login", credentials)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      history.push('/select-values')
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILED, payload: err });
    });
};

export const register = payload => dispatch => {
  dispatch({ type: REGISTER_START });
  axiosWithAuth()
    .post("api/auth/register", payload)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      localStorage.setItem("token", res.data);
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAILED, payload: err.response })
    });
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_CLICKED });
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("userValues")
  history.push('/')
  dispatch({ type: LOGOUT_SUCCESS });
};
