import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import {
  EMAIL_RULE,
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE,
  TEXT_RULE
} from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string()
      .required()
      .email()
      .pattern(EMAIL_RULE)
      .trim()
      .strict()
      .messages({
        'any.required': 'Email is required (cung cap boi UIT)',
        'string.email': 'Email phai dung cu phap duoc cung cap @gm.uit.edu.vn'
      }),
    username: Joi.string()
      .required()
      .pattern(TEXT_RULE)
      .trim()
      .strict()
      .message({
        'string.username': 'Day du ky tu'
      }),
    password: Joi.string()
      .required()
      .pattern(TEXT_RULE)
      .trim()
      .strict()
      .message({
        'string.password': 'Du kho nha'
      }),
    role: Joi.string().required().trim().strict().message({
      'string.role': 'Nhap vai tro vao'
    }),

    course: Joi.array()
      .items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
      )
      .default([])
  })

  try {
    // Chỉ định abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi (video 52)
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate dữ liệu xong xuôi hợp lệ thì cho request đi tiếp sang Controller
    next()
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    )
  }
}

export const userValidation = {
  createNew
}
