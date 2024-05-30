import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";
import { itemService } from "~/services/itemService";

const createItemOfCourse = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service
    const createdItem = await itemService.createItemOfCourse(req.body);
    res.status(StatusCodes.CREATED).json(createdItem);
  } catch (error) {
    next(error);
  }
};

const getDetailAllItem = async (req, res, next) => {
  try {
    const item = await itemService.getDetailAllItem();
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};

const updateDataItemOfCourse = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const updatedItem = await itemService.updateDataItemOfCourse(
      itemId,
      req.body
    );
    res.status(StatusCodes.OK).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

const deleteItemOfCourse = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await itemService.deleteItemOfCourse(itemId);
    res.status(StatusCodes.OK).json(deletedItem);
  } catch (error) {
    next(error);
  }
};

const deleteOneVideo = async (req, res, next) => {
  try {
    const itemvideo = req.params.id;
    const deletedvideo = await itemService.deleteOneVideo(itemvideo);
    res.status(StatusCodes.OK).json(deletedvideo);
  } catch (error) {
    next(error);
  }
};
const deleteOneNoti = async (req, res, next) => {
  try {
    const itemnoti = req.params.id;
    const deletednoti = await itemService.deleteOneNoti(itemnoti);
    res.status(StatusCodes.OK).json(deletednoti);
  } catch (error) {
    next(error);
  }
};

const deleteOnePost = async (req, res, next) => {
  try {
    const itempost = req.params.id;
    const deletedpost = await itemService.deleteOnePost(itempost);
    res.status(StatusCodes.OK).json(deletedpost);
  } catch (error) {
    next(error);
  }
};

const getListItemOfCourse = async (req, res, next) => {
  try {
    const idcourse = req.params.id;
    const listcourse = await itemService.getListItemOfCourse(idcourse);
    res.status(StatusCodes.OK).json(listcourse);
  } catch (error) {
    next(error);
  }
};
export const itemController = {
  //Danh cho Admin
  getDetailAllItem, // Lay het danh sach Item trong database

  //Danh cho Teacher
  createItemOfCourse, // truyen data
  updateDataItemOfCourse, // id item va update data
  deleteItemOfCourse, //id item

  // Phuc vu xoa cai nho
  deleteOneVideo, // idVideo
  deleteOnePost, // id post
  deleteOneNoti, // id Noti

  //Danh cho Student
  getListItemOfCourse, //id course
};
