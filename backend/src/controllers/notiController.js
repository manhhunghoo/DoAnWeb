import { StatusCodes } from "http-status-codes";
import { notiModel } from "~/models/Khoahoc/notiModel";
import { postModel } from "~/models/Khoahoc/postModel";
import { boardService } from "~/services/boardService";
import { itemService } from "~/services/itemService";
import { postService } from "~/services/postService";
import { videoService } from "~/services/videoService";

const createNewNotiOfItem = async (req, res, next) => {
  try {
    const creatednoti = await notiModel.createNewNotiOfItem(req.body);
    res.status(StatusCodes.CREATED).json(creatednoti);
  } catch (error) {
    next(error);
  }
};

const getDetailsAllNoti = async (req, res, next) => {
  try {
    const item = await notiModel.getDetailsAllNoti();
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};

const deleteNotiOfItem = async (req, res, next) => {
  try {
    var idnoti = req.params.id;
    const item = await notiModel.deleteNotiOfItem(idnoti);
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};
const getListNotiOfItem = async (req, res, next) => {
  try {
    var iditem = req.params.id;
    const item = await notiModel.getListNotiOfItem(iditem);
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};
export const notiController = {
  // Danh cho Admin
  getDetailsAllNoti, //

  // Danh cho Teacher
  createNewNotiOfItem, // truyen data
  deleteNotiOfItem, // truyen id noti

  // Danh cho hoc sinh
  getListNotiOfItem, // truyen id item
};
