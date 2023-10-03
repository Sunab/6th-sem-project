import {
  LoginRequest,
  LoginSuccess,
  LoginFail,
  ForgotPasswordRequest,
  ForgotPasswordSuccess,
  ForgotPasswordFail,
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
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
  UpdateProfileRequest,
  UpdatePasswordRequest,
  UpdateProfileSuccess,
  UpdatePasswordSuccess,
  UpdateProfileFail,
  UpdatePasswordFail,
  UpdateProfileReset,
  UpdatePasswordReset,
  UpdateUserReset,
  DeleteUserReset,
  ResetPasswordRequest,
  ResetPasswordSuccess,
  ResetPasswordFail,
} from '../Constants/user'

export const userReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case LoginRequest:
    case LoadUserRequest:
      return {
        loading: true,
        isLogin: false,
      };

    case LoginSuccess:
    case LoadUserSuccess:
      return {
        ...state,
        loading: false,
        isLogin: true,
        user: action.payload,
      };

    case LogoutSuccess:
      return {
        loading: false,
        isLogin: false,
        user: null,
      };

    case LoginFail:
      return {
        ...state,
        loading: true,
        isLogin: false,
        user: null,
        error: action.payload,
      };

    case LoadUserFail:
      return {
        loading: false,
        isLogin: false,
        user: null,
        error: action.payload,
      };

    case LogoutFail:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ClearErrors:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UpdateProfileRequest:
    case UpdatePasswordRequest:
    case UpdateUserRequest:
    case DeleteUserRequest:
      return {
        ...state,
        loading: true,
      };

    case UpdateProfileSuccess:
    case UpdatePasswordSuccess:
    case UpdateUserSuccess:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DeleteUserSuccess:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message : action.payload.message
      };

    case UpdateProfileFail:
    case UpdatePasswordFail:
    case UpdateUserFail:
    case DeleteUserFail:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case UpdateProfileReset:
    case UpdatePasswordReset:
    case UpdateUserReset:
      return {
        ...state,
        isUpdated: false,
      };
    case DeleteUserReset:
      return {
        ...state,
        isDeleted: false,
      };

    case ClearErrors:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case ForgotPasswordRequest:
    case ResetPasswordRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ForgotPasswordSuccess:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case ResetPasswordSuccess:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case ForgotPasswordFail:
    case ResetPasswordFail:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case ClearErrors:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Get all Users --- Admin
export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case AllUserRequest:
      return {
        ...state,
        loading: true,
      };

    case AllUserSuccess:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case AllUserFail:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ClearErrors:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Get User Detail --- Admin
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case UserDetailsRequest:
      return {
        ...state,
        loading: true,
      };

    case UserDetailsSuccess:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case UserDetailsFail:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ClearErrors:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};