import express from "express";
import { StatusCodes } from "http-status-codes";
import { commentController } from "~/controllers/commentController";
import { complainController } from "~/controllers/complainController";
import { complainModel } from "~/models/DienDang/complainModel";
import { eventModel } from "~/models/DienDang/eventNotiModel";

const Router = express.Router();

Router.route("/").get((req, res) => {
  res.status(StatusCodes.OK).json({ message: "GET: API get Event" });
});
//Lấy các API từ Admin
Router.route("/GetDetailAll").get(eventModel.getDetailsAll);
Router.route("/GetEventOfStudent/:id").get(eventModel.getEventOfStudent);
// truyen vao id Student

// API hỗ trợ việc di chuyển card giữa các column khác nhau trong một board

export const eventRoute = Router;
