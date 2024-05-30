/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { studyModel } from '~/models/Monhoc/studyModel'
import { join } from 'lodash'
import { studentModel } from '~/models/studentModel'

const createNew = async (reqBody) => {
  try {
    const newItem = {
      ...reqBody
    }

    const createditem = await studyModel.createNew(newItem)

    const getNewitem = await studyModel.findOneById(createditem.insertedId)
    // Trả kết quả về, trong Service luôn phải có return
    return getNewitem
  } catch (error) {
    throw error
  }
}

const getDetails = async (studyId) => {
  try {
    const item = await studyModel.getDetails(studyId)
    if (!item) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Study not found!')
    }
    return item
  } catch (error) {
    throw error
  }
}
const updateStudy = async (postId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedItem = await studyModel.updateStudy(postId, updateData)

    return updatedItem
  } catch (error) {
    throw error
  }
}

const getAll = async() => {
  const getAllStudy = await studyModel.getAll()
  return getAllStudy
}

const joining = async(studyId, reqBody) => {
  const getStudy = await studentModel.pushToStudy(studyId, reqBody.userId)
  return getStudy
}

const getStudyLearning = async(studentId) => {
  const getStudy = await studyModel.getStudyLearning(studentId)
  return getStudy
}

export const studyService = {
  createNew,
  getDetails,
  updateStudy,
  getAll,
  joining,
  getStudyLearning
}
