import express from "express";
import { StatusCodes } from "http-status-codes";
import { itemController } from "~/controllers/itemController";
import { itemValidation } from "~/validations/itemValidation";

const Router = express.Router();

Router.route("/").get((req, res) => {
  res.status(StatusCodes.OK).json({ message: "GET: API get ITEM" });
});
Router.route("/GetAllItem").get(itemController.getDetailAllItem);
Router.route("/Teacher/Item").post(itemController.createItemOfCourse); // truyen data
Router.route("/Teacher/UpdateItem/:id").put(
  itemController.updateDataItemOfCourse
); // truyen data

Router.route("/Teacher/DeleteItem/:id").delete(
  itemController.deleteItemOfCourse
); // truyen id item
Router.route("/Teacher/Item/DeleteOneVideo/:id").delete(
  itemController.deleteOneVideo
); // truyen id video

Router.route("/Teacher/Item/DeleteOneNoti/:id").delete(
  itemController.deleteOneNoti
); // truyen id noti
Router.route("/Teacher/Item/DeleteOnePost/:id").delete(
  itemController.deleteOnePost
); // truyen id post
Router.route("/Getlist/:id").get(itemController.getListItemOfCourse); // truyen id course

// API hỗ trợ việc di chuyển card giữa các column khác nhau trong một board

export const itemRoute = Router;
