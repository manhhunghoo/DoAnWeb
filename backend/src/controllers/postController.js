import { StatusCodes } from "http-status-codes";
import { postModel } from "~/models/Khoahoc/postModel";
import { boardService } from "~/services/boardService";
import { itemService } from "~/services/itemService";
import { postService } from "~/services/postService";
import { videoService } from "~/services/videoService";

const createNewPostOfItem = async (req, res, next) => {
  try {
    const createdpost = await postService.createNewPostOfItem(req.body);
    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdpost);
  } catch (error) {
    next(error);
  }
};

const getDetailsAllPost = async (req, res, next) => {
  try {
    const item = await postService.getDetailsAllPost();
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};

const updatePostOfItem = async (req, res, next) => {
  try {
    const postid = req.params.id;
    const updatepost = await postService.updatePostOfItem(postid, req.body);

    res.status(StatusCodes.OK).json(updatepost);
  } catch (error) {
    next(error);
  }
};

const deletePostOfItem = async (req, res, next) => {
  try {
    const postid = req.params.id;
    const updatepost = await postService.deletePostOfItem(postid);
    if (updatepost) {
      return res
        .status(StatusCodes.OK)
        .json({ messenger: "Da xoa thanh cong" });
    } else {
      return res
        .status(StatusCodes.OK)
        .json({ messenger: "Khong xoa thanh cong" });
    }
  } catch (error) {
    next(error);
  }
};

const getListPostOfItem = async (req, res, next) => {
  try {
    const idItem = req.params.id;
    const getlist = await postService.getListPostOfItem(idItem);

    res.status(StatusCodes.OK).json(getlist);
  } catch (error) {
    next(error);
  }
};
export const postController = {
  // Danh cho Admin
  getDetailsAllPost,

  // Danh cho Teacher
  createNewPostOfItem, // truyen data
  updatePostOfItem, //  truyen post id va updateData
  deletePostOfItem, // truyen id Post

  // Danh cho hoc sinh
  getListPostOfItem, // truyen id Item
};
