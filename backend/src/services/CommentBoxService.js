/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { ObjectId } from 'mongodb'
import { postModel } from '~/models/Khoahoc/postModel'
import { cboxModel } from '~/models/Monhoc/commentboxModel'
import { studyModel } from '~/models/Monhoc/studyModel'

const createNew = async (reqBody) => {
  try {
    const newItem = {
      ...reqBody
    }
    const createditem = await cboxModel.createNew(newItem)
    if (newItem.studyId)
    {
      await studyModel.updateCommentBoxId(newItem.studyId, createditem.insertedId)
    }
    const getNewitem = await cboxModel.findOneById(createditem.insertedId)
    // Trả kết quả về, trong Service luôn phải có return
    return getNewitem
  } catch (error) {
    throw error
  }
}

const getDetails = async () => {
  try {
    const item = await cboxModel.getDetails()
    if (!item) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'cBox not found!')
    }
    const resItem = cloneDeep(item)
    return resItem
  } catch (error) {
    throw error
  }
}
const findOneById = async (itemId) => {
  try {
    const item = await postModel.getDetails(new ObjectId(itemId))
    if (!item) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'cBox not found!')
    }
    const resItem = cloneDeep(item)
    return resItem
  } catch (error) {
    throw error
  }
}

const getComments = async (studyId) => {
  try {
    const item = await cboxModel.getComments(studyId)
    return item
  } catch (error) {
    throw error
  }
}

export const cboxService = {
  createNew,
  getDetails,
  findOneById,
  getComments
}
