import express from "express";
import { userController } from "~/controllers/userController";

const Router = express.Router();

Router.route("/").get((req, res) => {
  res.json({ message: "GET: API get list " });
});

//==============================
// STUDENT - CHỨC NĂNG //
//==============================
//---Đăng nhập- Đăng xuất
//--Chức năng đăng nhập kiểm tra
Router.route("/GetAllStudents").get(userController.getDetailsAllbyAdmin);
Router.route("/StudentReg").post(userController.StudentRegister);
Router.route("/StudentLogin/:email/:password").post(
  userController.StudentLogin
);
Router.route("/StudentLogOut/:id").put(userController.StudentLogOut);
Router.route("/getAlluserOnline").get(userController.getAllUserOnline);
Router.route("/UpdateStudent/:id").put(userController.updateStudent);

export const userRoute = Router;
