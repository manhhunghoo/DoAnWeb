import { slugify } from '~/utils/formatters'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { ObjectId } from 'mongodb'
import { itemModel } from '~/models/Khoahoc/itemModel'

const createItemOfCourse = async (reqBody) => {
  try {
    const newItem = {
      ...reqBody,
    }

    const createditem = await itemModel.createItemOfCourse(newItem)

    const getNewitem = await itemModel.findOneById(createditem.insertedId)
    // Trả kết quả về, trong Service luôn phải có return
    return getNewitem
  } catch (error) {
    throw error
  }
}

const getDetailAllItem = async () => {
  try {
    const item = await itemModel.getDetailAllItem();
    return item;
  } catch (error) {
    throw error
  }
}
const updateDataItemOfCourse = async (itemId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    }
    const updatedItem = await itemModel.updateDataItemOfCourse(
      itemId,
      updateData
    )

    return updatedItem
  } catch (error) {
    throw error
  }
}
const deleteOneVideo = async (idVideo) => {
  try {
    const deletedvideo = await itemModel.deleteOneVideo(idVideo)
    return deletedvideo
  } catch (error) {
    throw error
  }
}
const deleteOnePost = async (idPost) => {
  try {
    const deletedpost = await itemModel.deleteOnePost(idPost)
    return deletedpost
  } catch (error) {
    throw error
  }
}
const deleteOneNoti = async (idNoti) => {
  try {
    const deletednoti = await itemModel.deleteOneNoti(idNoti)
    return deletednoti
  } catch (error) {
    throw error
  }
}
const deleteItemOfCourse = async (itemId) => {
  try {
    const deletedItem = await itemModel.deleteItemOfCourse(itemId)
    return deletedItem
  } catch (error) {
    throw error
  }
}
const getListItemOfCourse = async (itemcourse) => {
  try {
    const getlist = await itemModel.getListItemOfCourse(itemcourse)
    return getlist
  } catch (error) {
    throw error
  }
}
export const itemService = {
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
}
