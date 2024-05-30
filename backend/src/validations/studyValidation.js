import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(), //yêu cầu
    description: Joi.string().required().min(3).max(255).trim().strict(), // yêu cầu
    owner: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message({ OBJECT_ID_RULE_MESSAGE })
      .required(),
    khoa: Joi.string().min(3).max(20).trim().strict()
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

const updateStudy = async (req, res, next) => {
  // Lưu ý không dùng hàm required() trong trường hợp Update
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(), //yêu cầu
    description: Joi.string().required().min(3).max(255).trim().strict(), // yêu cầu
    owner: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message({ OBJECT_ID_RULE_MESSAGE })
      .required(),
    khoa: Joi.string().min(3).max(20).trim().strict()
  })

  try {
    // Chỉ định abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi (video 52)
    // Đối với trường hợp update, cho phép Unknown để không cần đẩy một số field lên
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
export const studyValidation = {
  createNew,
  updateStudy
}
