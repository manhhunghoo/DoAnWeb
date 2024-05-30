import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import {
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE,
  EMAIL_RULE
} from '~/utils/validators'
import { courseModel } from '~/models/Khoahoc/courseModel'
import { teacherModel } from '~/models/teacherModel'
import { studentModel } from '~/models/studentModel'
import { ObjectId } from 'mongodb'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(255).trim().strict(),
    owner: Joi.string().required().email().pattern(EMAIL_RULE).trim().strict(),
    admin: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message({ OBJECT_ID_RULE_MESSAGE })
      .required()
  })

  try {
    // Chỉ định abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi (video 52)
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    const idOwner = await studentModel.findOneByEmail(req.body.owner)
    console.log(idOwner)
    var modified = {
      ...req.body,
      owner: String(idOwner._id)
    }
    console.log(modified)
    next(modified)
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    )
  }
}

const updateCourse = async (req, res, next) => {
  // Lưu ý không dùng hàm required() trong trường hợp Update
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(), //yêu cầu
    description: Joi.string().required().min(3).max(255).trim().strict(), // yêu cầu
    linkimgae: Joi.string().default(''),
    owner: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message({ OBJECT_ID_RULE_MESSAGE }),
    listitem: Joi.array()
      .items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
      )
      .default([])
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    )
  }
}

export const courseValidation = {
  createNew,
  updateCourse
}
