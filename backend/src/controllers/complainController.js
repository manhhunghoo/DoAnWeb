import { StatusCodes } from "http-status-codes";
import { complainModel } from "~/models/DienDang/complainModel";
import { baitapModel } from "~/models/Khoahoc/filebainopModel";
import { postModel } from "~/models/Khoahoc/postModel";
import { baitapService } from "~/services/baitapService";
import { boardService } from "~/services/boardService";
import { itemService } from "~/services/itemService";
import { postService } from "~/services/postService";
import { videoService } from "~/services/videoService";

const createNew = async (req, res, next) => {
  try {
    const createdcomplain = await complainModel.createNew(req.body);
    res.status(StatusCodes.CREATED).json(createdcomplain);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await complainModel.getDetails(itemId);
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};

const getDetailsAll = async (req, res, next) => {
  try {
    const item = await complainModel.getDetailsAll();
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};

export const complainController = {
  createNew,
  getDetails,
  getDetailsAll,
};
