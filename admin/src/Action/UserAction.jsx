import {
  LoginRequest,
  LoginSuccess,
  LoginFail,
  ForgotPasswordRequest,
  ForgotPasswordSuccess,
  ForgotPasswordFail,
  LogoutSuccess,
  LogoutFail,
  AllUserRequest,
  AllUserSuccess,
  AllUserFail,
  UserDetailsRequest,
  UserDetailsSuccess,
  UserDetailsFail,
  DeleteUserRequest,
  DeleteUserSuccess,
  DeleteUserFail,
  UpdateUserRequest,
  UpdateUserSuccess,
  UpdateUserFail,
  ClearErrors,
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail
} from '../Constants/user'
import axios from 'axios';
// import AuthToken from "../utils/AuthToken"; 
import { api } from '../utils/api';

// Login USER

export const login = (email, password) => async (dispatch) => {
  console.log(email, password,'emailllll');
  try {
    console.log('dispatch ko try  bhitra');
    dispatch({type : LoginRequest});
    let link = `/login`;
    const config = { headers: { "Content-Type": "application/json" } };
    const  {data}  = await api.post( link, { email, password }, config)
    // .then(res =>{
    //   const {token} = res.data;
    //   localStorage.setItem('jwt', token);
    //   AuthToken(token);
    // });

    console.log('dispatch kologin najikai');
    dispatch({type: LoginSuccess, payload: data.user });
    console.log("dispatch ko login bahyesi");
  } catch (error) {
    console.log('error bhitra login ko');
    dispatch({
      type: LoginFail,
      payload: error.message,
    });
  }
  // console.log(email, password);
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: ForgotPasswordRequest });
    let link = `/password/forgot`;
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await api.post(link, email, config);

    dispatch({ type: ForgotPasswordSuccess, payload: data.message });
  } catch (error) {
    dispatch({
      type: ForgotPasswordFail,
      payload: error.response.data.message,
    });
  }
};

// Load user
export const loadUser = () => async (dispatch) => { 
  try {
    dispatch({ type: LoadUserRequest });
    const { data } = await api.get(`/profile`);

    dispatch({ type: LoadUserSuccess,payload: data.message});
  } catch (error) {
    dispatch({
      type: LoadUserFail,
      payload: error.message,
    });
  }
};

// LOGOUT USER
export const logout = () => async (dispatch) => {
  try {
    let link = `/logout`;
    await api.get(link);

    dispatch({ type: LogoutSuccess });
  } catch (error) {
    dispatch({
      type: LogoutFail,
      payload: error.message,
    });
  }
};

// Load all users --- admin
export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: AllUserRequest });
    let link = `/admin/users`;
    const { data } = await axios.api(link);

    dispatch({ type: AllUserSuccess, payload: data.users });
  } catch (error) {
    dispatch({
      type: AllUserFail,
      payload: error.message,
    });
  }
};

// Load single user --- admin
export const getUserDetailsAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: UserDetailsRequest });
    let link = `/api/v1/admin/user/${userId}`;
    const { data } = await axios.get(link);

    dispatch({ type: UserDetailsSuccess, payload: data.user });
  } catch (error) {
    dispatch({
      type: UserDetailsFail,
      payload: error.response.data.message,
    });
  }
};

// UPDATE user --- Admin
export const updateUserAction = (userId, userData) => async (dispatch) => {
  try {
    dispatch({ type: UpdateUserRequest });
    let link = `/api/v1/admin/user/${userId}`;
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(link, userData, config);

    dispatch({ type: UpdateUserSuccess, payload: data.success });
  } catch (error) {
    dispatch({
      type: UpdateUserFail,
      payload: error.response.data.message,
    });
  }
};

// Delete user --- Admin
export const deleteUserAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DeleteUserRequest });
    let link = `/api/v1/admin/user/${userId}`;
    const { data } = await axios.delete(link);

    dispatch({ type: DeleteUserSuccess, payload: data });
  } catch (error) {
    dispatch({
      type: DeleteUserFail,
      payload: error.response.data.message,
    });
  }
};

// Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: ClearErrors });
};
