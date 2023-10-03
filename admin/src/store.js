import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    userReducer,
    profileReducer,
    allUsersReducer,
    forgotPasswordReducer,
    userDetailsReducer,
} from "./Reducers/userReducer";

const reducer = combineReducers({
    
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
  });

  const middleware = [thunk];
  

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
  export default store;
