import { StatusCodes } from "http-status-codes";
import { baitapModel } from "~/models/Khoahoc/filebainopModel";
import { postModel } from "~/models/Khoahoc/postModel";
import { baitapService } from "~/services/baitapService";
import { boardService } from "~/services/boardService";
import { itemService } from "~/services/itemService";
import { postService } from "~/services/postService";
import { videoService } from "~/services/videoService";

const createNewBaiTapOfNoti = async (req, res, next) => {
  try {
    const createdbaitap = await baitapService.createNewBaiTapOfNoti(req.body);
    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdbaitap);
  } catch (error) {
    next(error);
  }
};

const getDetailsAllBaiTap = async (req, res, next) => {
  try {
    const item = await baitapService.getDetailsAllBaiTap();
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};

const getListPostOfNoti = async (req, res, next) => {
  try {
    // truyen vao id cua Noti
    const item = await baitapService.getListPostOfNoti(req.params.idNoti);
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};

export const baitapController = {
  // Danh cho Admin
  getDetailsAllBaiTap,

  // Danh cho Teacher
  getListPostOfNoti,

  // Danh cho hoc sinh
  createNewBaiTapOfNoti,
};
