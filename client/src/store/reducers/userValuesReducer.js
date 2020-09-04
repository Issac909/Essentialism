import {
    USER_VALUES_LOAD_START,
    USER_VALUES_LOAD_SUCCESS,
    USER_VALUES_LOAD_FAILURE,
    USER_VALUES_POST_START,
    USER_VALUES_POST_SUCCESS,
    USER_VALUES_POST_FAILURE,
    USER_VALUES_PUT_START,
    USER_VALUES_PUT_SUCCESS,
    USER_VALUES_PUT_FAILURE,
    USER_VALUES_DELETE_START,
    USER_VALUES_DELETE_SUCCESS,
    USER_VALUES_DELETE_FAILURE,
    GETTING_CUSTOM_VALUES,
    GET_CUSTOM_VALUES_SUCCESS,
    GET_CUSTOM_VALUE_FAILED,
    CUSTOM_VALUE_POST_REQUEST,
    CUSTOM_VALUE_POST_SUCCESS,
    CUSTOM_VALUE_POST_FAILED,
    CUSTOM_VALUE_PUT_REQUEST,
    CUSTOM_VALUE_PUT_SUCCESS,
    CUSTOM_VALUE_PUT_FAILED
  } from "../actions/userValueActions";
  
  const initialState = {
    userValues: [
      {
        id: "",
        value: "",
        custom_value: '',
        value_description: ""
      }
    ],
    isProfileSet: false
  };
  
  const userValuesReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_VALUES_LOAD_START:
        return {
          ...state,
          isLoading: true
        };
      case USER_VALUES_LOAD_SUCCESS:
        return {
          ...state,
          userValues: action.payload,
          isLoading: false
        };
      case USER_VALUES_LOAD_FAILURE:
        return {
          ...state,
          error: action.payload,
          isLoading: false
        };
      case USER_VALUES_POST_START:
        return {
          ...state,
          isLoading: true
        };
      case USER_VALUES_POST_SUCCESS:
        return {
          ...state,
          userValues: [...state.userValues, action.payload],
          isLoading: false
        };
      case USER_VALUES_POST_FAILURE:
        return {
          ...state,
          error: action.payload,
          isLoading: false
        };
      case USER_VALUES_PUT_START:
        return {
          ...state,
          isLoading: true
        };
      case USER_VALUES_PUT_SUCCESS:
        return {
          ...state,
          userValues: [...state.userValues, action.payload]
        };
      case USER_VALUES_PUT_FAILURE:
        return {
          ...state,
          error: action.payload,
          isLoading: false
        };
  
      case USER_VALUES_DELETE_START:
        return {
          ...state,
          isLoading: true
        };
      case USER_VALUES_DELETE_SUCCESS:
        return {
          ...state,
          userValues: action.payload
        };
      case USER_VALUES_DELETE_FAILURE:
        return {
          ...state,
          error: action.payload,
          isLoading: false
        };
      case GETTING_CUSTOM_VALUES:
        return {
          ...state,
          isLoading: true
        }
      case GET_CUSTOM_VALUES_SUCCESS:
        return {
          ...state,
          isLoading: false,
          userValues: [...state.userValues, {custom_value: action.payload}]
        }
      case GET_CUSTOM_VALUE_FAILED:
        return {
          ...state,
          error: action.payload
        }
      case CUSTOM_VALUE_POST_REQUEST:
        return {
          ...state,
          isLoading: true
        }
      case CUSTOM_VALUE_POST_SUCCESS:
        return {
          ...state,
          isLoading: false,
          userValues: [...state.userValues, action.payload]
        }
      case CUSTOM_VALUE_POST_FAILED:
        return {
          ...state,
          error: action.payload
        }
      case CUSTOM_VALUE_PUT_REQUEST:
        return {
          ...state,
          isLoading: true
        }
      case CUSTOM_VALUE_PUT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          userValues: [...state.userValues, {custom_value: action.payload}]
        }
      case CUSTOM_VALUE_PUT_FAILED:
        return {
          ...state,
          error: action.payload
        }
      default:
        return state;
    }
  };
  
  export default userValuesReducer;