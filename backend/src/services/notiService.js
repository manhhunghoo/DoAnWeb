import { slugify } from '~/utils/formatters'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { ObjectId } from 'mongodb'
import { postModel } from '~/models/Khoahoc/postModel'
import { notiModel } from '~/models/Khoahoc/notiModel'

const createNewNotiOfItem = async (reqBody) => {
  try {
    const newItem = {
      ...reqBody,
    }

    const createditem = await notiModel.createNewNotiOfItem(newItem)

    const getNewitem = await notiModel.findOneById(createditem.insertedId)
    return getNewitem
  } catch (error) {
    throw error
  }
}

const getDetailsAllVideos = async () => {
  try {
    const item = await notiModel.getDetailsAllVideos()

    return item
  } catch (error) {
    throw error
  }
}
const deleteNotiOfItem = async (idNotis) => {
  try {
    const deletenoti = await notiModel.deleteNotiOfItem(idNotis)
    return deletenoti
  } catch (error) {
    throw error
  }
}

const getListNotiOfItem = async (idItem) => {
  try {
    const getlist = await notiModel.getListNotiOfItem(idItem)
    return getlist
  } catch (error) {
    throw error
  }
}
export const notiService = {
  // Danh cho Admin
  getDetailsAllVideos, //

  // Danh cho Teacher
  createNewNotiOfItem, // truyen data
  deleteNotiOfItem, // truyen id noti

  // Danh cho hoc sinh
  getListNotiOfItem, // truyen id item
}
