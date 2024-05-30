import express from "express";
import { StatusCodes } from "http-status-codes";
import { baitapController } from "~/controllers/baitapController";
import { baitapValidation } from "~/validations/baitapValidation";

const Router = express.Router();

Router.route("/").get((req, res) => {
  res.status(StatusCodes.OK).json({ message: "GET: API get list Baitap" });
});

// Danh cho admin
Router.route("/GetAllBaitap").get(baitapController.getDetailsAllBaiTap);
//Danh cho teacher
Router.route("/GetDanhSach/:idNoti").get(baitapController.getListPostOfNoti);
//Danh cho sinh vien
Router.route("/CreateBainop").post(baitapController.createNewBaiTapOfNoti);

export const baitapRoute = Router;
