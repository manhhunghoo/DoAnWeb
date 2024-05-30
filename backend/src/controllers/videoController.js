import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";
import { itemService } from "~/services/itemService";
import { videoService } from "~/services/videoService";

const createNewVideosOfItem = async (req, res, next) => {
  try {
    const createdvideo = await videoService.createNewVideosOfItem(req.body);

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(createdvideo);
  } catch (error) {
    next(error);
  }
};

const getDetailsAllVideos = async (req, res, next) => {
  try {
    const item = await videoService.getDetailsAllVideos();
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};

const updateVideosOfItem = async (req, res, next) => {
  try {
    const videoid = req.params.id;
    const updatedItem = await videoService.updateVideosOfItem(
      videoid,
      req.body
    );

    res.status(StatusCodes.OK).json(updatedItem);
  } catch (error) {
    next(error);
  }
};
const deleteVideoOfItem = async (req, res, next) => {
  try {
    const videoid = req.params.id;
    const deleteVideo = await videoService.deleteVideoOfItem(videoid);
    res.status(StatusCodes.OK).json(deleteVideo);
  } catch (error) {
    next(error);
  }
};

const deleteOneCommentBox = async (req, res, next) => {
  try {
    const cboxid = req.params.id;
    const deletecbox = await videoService.deleteOneCommentBox(cboxid);
    res.status(StatusCodes.OK).json(deletecbox);
  } catch (error) {
    next(error);
  }
};
const getListVideoOfItem = async (req, res, next) => {
  try {
    const itemid = req.params.id;
    const getlist = await videoService.getListVideoOfItem(itemid);
    res.status(StatusCodes.OK).json(getlist);
  } catch (error) {
    next(error);
  }
};
export const videoController = {
  // Danh cho Admin
  getDetailsAllVideos, //

  // Danh cho Teacher
  createNewVideosOfItem, // truyen data
  updateVideosOfItem, // truyen video id va upadte data
  deleteVideoOfItem, // truyen id video

  //Phuc vu cho cai nho
  deleteOneCommentBox, // turyen id cBox

  // Danh cho hoc sinh
  getListVideoOfItem, // tuyen id Item
};
