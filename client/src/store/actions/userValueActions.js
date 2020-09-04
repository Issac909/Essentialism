import { axiosWithAuth } from "../../utils/axiosWithAuth";

//USER VALUE ACTIONS/////////////////////////////////////////////////////////

export const USER_VALUES_LOAD_START = "USER_VALUES_LOAD_START";
export const USER_VALUES_LOAD_SUCCESS = "USER_VALUES_LOAD_SUCCESS";
export const USER_VALUES_LOAD_FAILURE = "USER_VALUES_LOAD_FAILURE";

export const USER_VALUES_POST_START = "USER_VALUES_POST_START";
export const USER_VALUES_POST_SUCCESS = "USER_VALUES_POST_SUCCESS";
export const USER_VALUES_POST_FAILURE = "USER_VALUES_POST_FAILURE";

export const USER_VALUES_PUT_START = "USER_VALUES_PUT_START";
export const USER_VALUES_PUT_SUCCESS = "USER_VALUES_PUT_SUCCESS";
export const USER_VALUES_PUT_FAILURE = "USER_VALUES_PUT_FAILURE";

export const USER_VALUES_DELETE_START = "USER_VALUES_DELETE_START";
export const USER_VALUES_DELETE_SUCCESS = "USER_VALUES_DELETE_SUCCESS";
export const USER_VALUES_DELETE_FAILURE = "USER_VALUES_DELETE_FAILURE";

export const GETTING_CUSTOM_VALUES = 'GETTING_CUSTOM_VALUES';
export const GET_CUSTOM_VALUES_SUCCESS = 'GET_CUSTOM_VALUES_SUCCESS';
export const GET_CUSTOM_VALUE_FAILED = 'GET_CUSTOM_VALUE_FAILED';

export const CUSTOM_VALUE_POST_REQUEST = 'CUSTOM_VALUE_POST_REQUEST';
export const CUSTOM_VALUE_POST_SUCCESS = 'CUSTOM_VALUE_POST_SUCCESS';
export const CUSTOM_VALUE_POST_FAILED = 'CUSTOM_VALUE_POST_FAILED';

export const CUSTOM_VALUE_PUT_REQUEST = 'CUSTOM_VALUE_PUT_REQUEST';
export const CUSTOM_VALUE_PUT_SUCCESS = 'CUSTOM_VALUE_PUT_SUCCESS';
export const CUSTOM_VALUE_PUT_FAILED = 'CUSTOM_VALUE_PUT_FAILED';

export const INVOLVMENT_PROMPT_REQUEST = 'INVOLVMENT_PROMPT_REQUEST';
export const INVOLVMENT_PROMPT_SUCCESS = 'INVOLVMENT_PROMPT_SUCCESS';
export const INVOLVMENT_PROMPT_FAILED = 'INVOLVMENT_PROMPT_SUCCESS';

//GET REQUESTS/////////////////////////////////////////////////////////////

export const getUserValues = userId => dispatch => {
  dispatch({ type: USER_VALUES_LOAD_START });
  return axiosWithAuth()
    .get(`api/users/user-values`)
    .then(res =>
      dispatch({ type: USER_VALUES_LOAD_SUCCESS, payload: res.data })
    )
    .catch(err => {
      dispatch({ type: USER_VALUES_LOAD_FAILURE, payload: "error loading values" + err });
    });
};

export const getCustomValues = () => dispatch => {
  dispatch({ type: GETTING_CUSTOM_VALUES })
  return axiosWithAuth()
    .get(`api/values/custom`)
    .then(res => {
      dispatch({ type: GET_CUSTOM_VALUES_SUCCESS, payload: res.data});
    })
    .catch(err => {
      dispatch({ type: GET_CUSTOM_VALUE_FAILED, payload: err.response })
    });
}

//POST REQUESTS///////////////////////////////////////////////////////////

export const postUserValues = value => dispatch => {
  dispatch({ type: USER_VALUES_POST_START, payload: value });
  return axiosWithAuth()
    .post(`api/users/user-values`, value)
    .then(res => {
      dispatch({
        type: USER_VALUES_POST_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: USER_VALUES_POST_FAILURE,
        payload: "error posting data" + err
      });
    });
};

export const postCustomValue = value => dispatch => {
  dispatch({ type: CUSTOM_VALUE_POST_REQUEST })
  
  return axiosWithAuth()
    .post(`api/values/custom`, value)
    .then(res => {
      dispatch({ type: CUSTOM_VALUE_POST_SUCCESS, payload: res.data})
    })
    .catch(err => {
      dispatch({ type: CUSTOM_VALUE_POST_FAILED, payload: err.response})
    });
} 

//PUT REQUESTS//////////////////////////////////////////////////////////////

export const putUserValues = value => dispatch => {
  dispatch({ type: USER_VALUES_PUT_START, payload: value });
  const id = localStorage.getItem('id')
  return axiosWithAuth()
    .put(`api/users/${id}/prompt`, value)
    .then(res => {
      dispatch({ type: USER_VALUES_PUT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: USER_VALUES_PUT_FAILURE, payload: err.response });
    });
};

export const putUserInvolvement = value => dispatch => {
  dispatch({ type: INVOLVMENT_PROMPT_REQUEST })
 const id = localStorage.getItem('id');
 return axiosWithAuth()
  .put(`api/users/${id}/involvement`, value)
  .then(res => {
    dispatch({ type: INVOLVMENT_PROMPT_SUCCESS, payload: res.data})
  })
  .catch(err => {
    dispatch({ type: INVOLVMENT_PROMPT_FAILED, payload: err.response})
  })
}

export const putCustomValues = value => dispatch => {
  dispatch({ type: CUSTOM_VALUE_PUT_REQUEST })
  const id = localStorage.getItem('id');
  axiosWithAuth()
    .put(`api/values/custom/${id}`)
    .then(res => {
      dispatch({ type: CUSTOM_VALUE_PUT_SUCCESS, payload: res.data})
    })
    .catch(err => {
      dispatch({ CUSTOM_VALUE_PUT_FAILED, payload: err.response})
    })
}

//DELETE REQUESTS (NO ENDPOINTS, USING PUT INSTEAD)

// export const deleteUserValues = id => dispatch => {
//   dispatch({ type: USER_VALUES_DELETE_START });
//   return axiosWithAuth()
//     .delete(`/user/${id}/values`)
//     .then(res => {
//       dispatch({
//         type: USER_VALUES_DELETE_SUCCESS,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: USER_VALUES_DELETE_FAILURE,
//         payload: "error deleting values data" + err
//       });
//     });
// };