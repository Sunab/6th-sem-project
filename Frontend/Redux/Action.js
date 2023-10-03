import { api, api1 } from "./api";
import {
  addTaskRequest,
  addTaskSuccess,
  addTaskFail,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFail,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  getTaskRequest,
  getTaskSuccess,
  getTaskFailure,
  viewTaskSuccess,
  viewTaskFail,
  viewTaskRequest,
} from "./messageSlice";
import {
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginRequest,
  loginSuccess,
  loginFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updatePassRequest,
  updatePassSuccess,
  updatePassFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  registerRequest,
  registerSuccess,
  registerFail,
  verifyAccRequest,
  verifyAccSuccess,
  verifyAccFail,
} from "./userSlice";

// Login
export const login = (email, password) => async (dispatch) => {
  console.log(email, password);
  try {
    dispatch(loginRequest());
    const { data } = await api.post(`/login`, { email, password });
    console.log(data, "data yaha aayo");

    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.message));
  }
};
// Logout

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    await api.get("/logout");
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.message));
  }
};

// Get My Profile
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await api.get("/profile");
    dispatch(loadUserSuccess(data.message));
  } catch (error) {
    dispatch(loadUserFail(error.response));
  }
};

// add Task

export const addTask =
  (title, description, hospital_name, blood_group,number, longitude, latitude) =>
  async (dispatch) => {
    try {
      dispatch(addTaskRequest());
      const { data } = await api.post("/newtask", {
        title,
        description,
        hospital_name,
        blood_group,
        number,
        longitude,
        latitude,
      });
      console.log(data, "responseeee");
      dispatch(addTaskSuccess(data.message));
    } catch (error) {
      dispatch(addTaskFail(error.response));
    }
  };
  // View Task
  export  const viewTask=()=>async(dispatch)=>{
    try{
        dispatch(viewTaskRequest());
        const { data} = await api.get("/mytask");
    
        dispatch(viewTaskSuccess(data));
      } catch (error) {
        dispatch(viewTaskFail(error.response));
      }
    };

// Update Task
export const updateTask = (taskId) => async (dispatch) => {
  try {
    dispatch(updateTaskRequest());
    const { data } = await api.get(`/task/${taskId}`);
    dispatch(updateTaskSuccess(data));
  } catch (error) {
    dispatch(updateTaskFail(error.message));
  }
};
// Delete Task

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch(deleteTaskRequest());
    const { data } = await api.delete(`/task/${taskId}`);
    dispatch(deleteTaskSuccess(data));
  } catch (error) {
    dispatch(deleteTaskFail(error.message));
  }
};

// update profile
export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    const { data } = await api1.put(`/updateProfile`, formData);
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFail(error.message));
  }
};
// Register user
export const register = (formData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const  data = await api.post(`/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(registerSuccess(data));
    console.log(data, "Daaattttaaaa");
  } catch (error) {
    console.error(error.message, "error from actionsss");
    dispatch(registerFail(error?.response.data, "Failllllll"));
  }
};

// update Password
export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch(updatePassRequest());
      const { data } = await api.put(`/updatePassword`, {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      dispatch(updatePassSuccess(data));
    } catch (error) {
      dispatch(updatePassFail(error.message));
    }
  };

// Verify profile
export const verifyAccount = (otp) => async (dispatch) => {
  try {
    dispatch(verifyAccRequest());
    const { data } = await api.post(`/verify`, { otp });

    dispatch(verifyAccSuccess(data));
  } catch (error) {
    dispatch(verifyAccFail(error.response));
  }
};
// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const { data } = await api.post(`/forgetPassword`, {
      email,
    });
    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.message));
  }
};
// Reset Password
export const resetPassword =
  (otp, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch(resetPasswordRequest());
      const { data } = await api.put(`/resetPassword`, {
        otp,
        newPassword,
        confirmPassword,
      });
      dispatch(resetPasswordSuccess(data));
    } catch (error) {
      dispatch(resetPasswordFail(error.message));
    }
  };
//fetched all tasks array
export const getTasks = () => async (dispatch) => {
  try {
    dispatch(getTaskRequest());
    const { data } = await api.get("/viewtask");

    dispatch(getTaskSuccess(data));
  } catch (error) {
    dispatch(getTaskFailure(error.response));
  }
};


