import express from "express";
import { StatusCodes } from "http-status-codes";
import { notiController } from "~/controllers/notiController";
import { noticeController } from "~/controllers/noticeController";
import { postController } from "~/controllers/postController";
import { notiValidation } from "~/validations/notiValidation";
import { postValidation } from "~/validations/postValidation";

const Router = express.Router();

Router.route("/").get((req, res) => {
  res.status(StatusCodes.OK).json({ message: "GET: API get list NOTI" });
});
Router.route("/GetAllNoti").get(notiController.getDetailsAllNoti);
Router.route("/CreateNewNoti").post(notiController.createNewNotiOfItem); // truyen data
Router.route("/DeleteNoti/:id").delete(notiController.deleteNotiOfItem); // truyen vao id noti
Router.route("/GetlistNoti/:id").get(notiController.getListNotiOfItem); // truyen id item

// API hỗ trợ việc di chuyển card giữa các column khác nhau trong một board

export const notiRoute = Router;
