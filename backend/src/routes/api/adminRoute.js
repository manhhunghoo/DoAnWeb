import express from "express";
import { StatusCodes } from "http-status-codes";
import { adminController } from "~/controllers/adminController";
import { baitapController } from "~/controllers/baitapController";
import { baitapValidation } from "~/validations/baitapValidation";

const Router = express.Router();

Router.route("/").get((req, res) => {
  res.status(StatusCodes.OK).json({ message: "GET: API get ADMIN" });
});
//Lấy các API từ Admin
Router.route("/AdminReg").post(adminController.adminRegister);
Router.route("/AdminLogin/:email/:password").post(adminController.adminLogIn);
Router.route("/Admin/:id").get(adminController.getAdminDetails);

// API hỗ trợ việc di chuyển card giữa các column khác nhau trong một board

export const adminRoute = Router;
