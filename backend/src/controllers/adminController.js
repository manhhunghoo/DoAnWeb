/* eslint-disable no-useless-catch */
import { StatusCodes } from "http-status-codes";
import { baitapModel } from "~/models/Khoahoc/filebainopModel";
import { postModel } from "~/models/Khoahoc/postModel";
import { adminModel } from "~/models/adminModel";
import { adminService } from "~/services/adminService";
import { baitapService } from "~/services/baitapService";
import { boardService } from "~/services/boardService";
import { itemService } from "~/services/itemService";
import { postService } from "~/services/postService";
import { videoService } from "~/services/videoService";

const adminRegister = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
    };
    const createdUser = await adminModel.createNew(data);

    if (createdUser == null) {
      res.status(StatusCodes.BAD_REQUEST).json("Đã tồn tại");
      return;
    }
    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdUser);
  } catch (error) {
    throw next(error);
  }
};

const adminLogIn = async (req, res, next) => {
  try {
    const testadmin = await adminModel.checkExist(
      req.params.email,
      req.params.password
    );
    const admin = await adminModel.getDetailsbyEmail(req.params.email);
    if (testadmin != null) {
      res.status(StatusCodes.OK).json(admin);
    } else {
      res.status(StatusCodes.FAILED_DEPENDENCY).send({ message: "That bai" });
    }
  } catch (error) {
    next(error);
  }
};

const getAdminDetails = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await adminService.getDetails(itemId);
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};
// Them ham Delete
export const adminController = {
  adminRegister,
  getAdminDetails,
  adminLogIn,
};
