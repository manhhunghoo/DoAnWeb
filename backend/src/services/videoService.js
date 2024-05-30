import { slugify } from "~/utils/formatters";
import ApiError from "~/utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { ObjectId } from "mongodb";
import { videoModel } from "~/models/Khoahoc/videoModel";

const createNewVideosOfItem = async (reqBody) => {
  try {
    const newItem = {
      ...reqBody,
    };

    const createdvideo = await videoModel.createNewVideosOfItem(newItem);

    const getNewivideo = await videoModel.findOneById(createdvideo.insertedId);
    // Trả kết quả về, trong Service luôn phải có return
    return getNewivideo;
  } catch (error) {
    throw error;
  }
};

const getDetailsAllVideos = async () => {
  try {
    const item = await videoModel.getDetailsAllVideos();
    return item;
  } catch (error) {
    throw error;
  }
};
const updateVideosOfItem = async (videoitem, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updatedItem = await videoModel.updateVideosOfItem(
      videoitem,
      updateData
    );

    return updatedItem;
  } catch (error) {
    throw error;
  }
};
const deleteVideoOfItem = async (videoid) => {
  try {
    const deleteVideo = await videoModel.deleteVideoOfItem(videoid);
    return deleteVideo;
  } catch (error) {
    throw error;
  }
};
const deleteOneCommentBox = async (idcbox) => {
  try {
    const deletecbox = await videoModel.deleteOneCommentBox(idcbox);

    return deletecbox;
  } catch (error) {
    throw error;
  }
};
const getListVideoOfItem = async (idItem) => {
  try {
    const getlist = await videoModel.getListVideoOfItem(idItem);

    return getlist;
  } catch (error) {
    throw error;
  }
};
export const videoService = {
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
