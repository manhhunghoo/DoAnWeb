import { slugify } from "~/utils/formatters";
import ApiError from "~/utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { ObjectId } from "mongodb";
import { postModel } from "~/models/Khoahoc/postModel";
import { baitapModel } from "~/models/Khoahoc/filebainopModel";

const createNewBaiTapOfNoti = async (reqBody) => {
  try {
    const newItem = {
      ...reqBody,
    };

    const createditem = await baitapModel.createNewBaiTapOfNoti(newItem);
    const getNewitem = await baitapModel.findOneById(createditem.insertedId);
    // Trả kết quả về, trong Service luôn phải có return
    return getNewitem;
  } catch (error) {
    throw error;
  }
};

const getDetailsAllBaiTap = async () => {
  try {
    const item = await baitapModel.getDetailsAllBaiTap();
    return item;
  } catch (error) {
    throw error;
  }
};

const getListPostOfNoti = async (idNoti) => {
  try {
    // Lay danh sach nguoi nop bai tap cua 1 cai noti
    const item = await baitapModel.getListPostOfNoti(idNoti);
    return item;
  } catch (error) {
    throw error;
  }
};

export const baitapService = {
  // Danh cho Admin
  getDetailsAllBaiTap,

  // Danh cho Teacher
  getListPostOfNoti,

  // Danh cho hoc sinh

  createNewBaiTapOfNoti,
};
