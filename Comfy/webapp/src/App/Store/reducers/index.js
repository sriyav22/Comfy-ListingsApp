import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import listingReducer from "./listingReducers";


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  listings: listingReducer
});