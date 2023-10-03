import express from "express";

import {
  register,
  verify,
  login,
  logout,
  addTask,
  viewTask,
  viewAllTask,
  removeTask,
  updateTask,
  updateProfile,
  updatePassword,
  forgetPassword,
  resetPassword,
  getUserDetails,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser
} from "../controllers/User.js";
import { isAuthenticated, authorizedRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/verify").post(isAuthenticated, verify);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/newtask").post(isAuthenticated, addTask);
router.route("/viewtask").get(viewAllTask);
router.route("/mytask").get(viewTask);
router.route("/profile").get(isAuthenticated, getUserDetails);
router
  .route("/task/:taskId")
  .get(isAuthenticated, updateTask)
  .delete(isAuthenticated, removeTask);
router.route("/updateprofile").put(isAuthenticated, updateProfile);
router.route("/updatepassword").put(isAuthenticated, updatePassword);
router.route("/forgetpassword").post(forgetPassword);
router.route("/resetpassword").put(resetPassword);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizedRoles("admin"), getAllUsers);
router
  .route("/admin/users/:id")
  .get(isAuthenticated, authorizedRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorizedRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteUser);
  // router
  // .route("/admin/viewtask"
  // ).get(isAuthenticated, authorizedRoles('admin'),viewAllTask);

export default router;
