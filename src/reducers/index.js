import { combineReducers } from "redux";
import vistaReducer from "./vistaReducer";

export default combineReducers({
  vista: vistaReducer
});
