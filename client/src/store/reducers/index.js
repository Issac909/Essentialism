import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import valuesReducer from "./valuesReducer";
import userValuesReducer from "./userValuesReducer";


const rootReducer = combineReducers({
  login: loginReducer,
  values: valuesReducer,
  userValues: userValuesReducer,
});

export default rootReducer;