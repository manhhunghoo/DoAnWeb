/* eslint-disable no-useless-catch */

import { itemModel } from "~/models/Khoahoc/itemModel";
import { postModel } from "~/models/Khoahoc/postModel";
import { studyModel } from "~/models/Monhoc/studyModel";

const createNewPostOfItem = async (reqBody) => {
  try {
    const newItem = {
      ...reqBody,
    };

    const createdpost = await postModel.createNewPostOfItem(newItem);
    const getNewitem = await postModel.findOneById(createdpost.insertedId);
    // Trả kết quả về, trong Service luôn phải có return
    return getNewitem;
  } catch (error) {
    throw error;
  }
};

const getDetailsAllPost = async () => {
  try {
    const item = await postModel.getDetailsAllPost();
    return item;
  } catch (error) {
    throw error;
  }
};
const updatePostOfItem = async (postId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updatedItem = await postModel.updatePostOfItem(postId, updateData);

    return updatedItem;
  } catch (error) {
    throw error;
  }
};

const deletePostOfItem = async (postId) => {
  try {
    const deletepost = await postModel.deletePostOfItem(postId);
    return deletepost;
  } catch (error) {
    throw error;
  }
};
const getListPostOfItem = async (iditem) => {
  try {
    const getlistpost = await postModel.getListPostOfItem(iditem);
    return getlistpost;
  } catch (error) {
    throw error;
  }
};

export const postService = {
  // Danh cho Admin
  getDetailsAllPost,

  // Danh cho Teacher
  createNewPostOfItem, // truyen data
  updatePostOfItem, //  truyen post id va updateData
  deletePostOfItem, // truyen id Post

  // Danh cho hoc sinh
  getListPostOfItem, // truyen id Item
};
