/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { studentModel, userModel } from '~/models/studentModel'
import { cloneDeep } from 'lodash'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'

const createNew = async (reqBody) => {
  try {
    const newUser = {
      ...reqBody
    }

    const createdUser = await studentModel.createNew(newUser)
    if (createdUser == null) {
      return null
    }

    // Lấy bản ghi board sau khi gọi (tùy mục đích dự án mà có cần bước này hay không)
    const getNewUser = await studentModel.findOneById(createdUser.insertedId)
    // Trả kết quả về, trong Service luôn phải có return
    return getNewUser
  } catch (error) {
    throw error
  }
}

const TeacherConfirm = async (userId) => {
  try {
    const user = await userModel.getDetails(new ObjectId(userId))
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
    }
    const resUser = cloneDeep(user)
    return resUser
  } catch (error) {
    throw error
  }
}

const getDetails = async (userId) => {
  try {
    const user = await userModel.getDetails(new ObjectId(userId))
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
    }
    const resUser = cloneDeep(user)
    return resUser
  } catch (error) {
    throw error
  }
}
const getDetailsAll = async (userId) => {
  try {
    const user = await studentModel.getDetailsAll()
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
    }
    const resUser = cloneDeep(user)
    return resUser
  } catch (error) {
    throw error
  }
}

const checkExist = async (email, password) => {
  try {
    const existStudent = await studentModel.checkExist(email, password)
    if (existStudent == null) {
      return null
    }
    return existStudent
  } catch (error) {
    throw error
  }
}

const changeOnline = async (userId) => {
  try {
    const status = await studentModel.changeOnline(userId)
    return status
  } catch (error) {
    throw error
  }
}

const changeOffline = async (userId) => {
  try {
    const status = await studentModel.changeOffline(userId)
    return status
  } catch (error) {
    throw error
  }
}

const getAllUserOnline = async() => {
  const getAllStudy = await studentModel.getAllUserOnline()
  return getAllStudy
}

const findOneById= async (id) => {
  try {
    const user = await studentModel.findOneById(id)
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
    }
    return user
  }
  catch (error) {
    throw error
  }
}

export const userService = {
  createNew,
  getDetails,
  getDetailsAll,
  checkExist,
  changeOnline,
  changeOffline,
  getAllUserOnline,
  findOneById,
}
