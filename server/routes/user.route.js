const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getAllUser,
  deleteUser,
  getSingleUser,
} = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logout);
userRouter.get(
  "/allusers",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUser
);
userRouter.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);
userRouter.get(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleUser
);

module.exports = userRouter;
