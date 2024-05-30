import express from "express";
import { StatusCodes } from "http-status-codes";
import { adminController } from "~/controllers/adminController";
import { baitapController } from "~/controllers/baitapController";
import { teacherController } from "~/controllers/teacherController";
import { baitapValidation } from "~/validations/baitapValidation";

const Router = express.Router();

Router.route("/").get((req, res) => {
  res.status(StatusCodes.OK).json({ message: "GET: API get TEACHER" });
});
//Lấy các API từ Admin
Router.route("/TeacherReg").post(teacherController.TeacherRegister);
Router.route("/TeacherLogin/:email/:password").post(
  teacherController.TeacherLogin
);
Router.route("/Teacher/:id").get(teacherController.getTeacherDetails);
Router.route("/UpdateTeacher/:id").put(teacherController.updateTeacher);

Router.route("/getall").get(teacherController.getTeacherAll);
// API hỗ trợ việc di chuyển card giữa các column khác nhau trong một board

export const teacherRoute = Router;
