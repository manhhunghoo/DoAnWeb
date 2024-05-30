import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { cboxModel } from '~/models/Monhoc/commentboxModel'
import { postModel } from '../Khoahoc/postModel'
import { studentModel } from '~/models/studentModel'
// Define Collection (Name & Schema)
const STUDY_COLLECTION_NAME = 'studies'
const STUDY_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(), //yêu cầu
  description: Joi.string().required().min(3).max(255).trim().strict(), // yêu cầu
  linkimage: Joi.string().default(''),
  memberof: Joi.number().default(0),
  owner: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message({ OBJECT_ID_RULE_MESSAGE })
    .required(),
  khoa: Joi.string().min(3).max(20).trim().strict(),
  commentBoxId: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  listPost: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([])
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt', 'commentBox', 'owner']

const validateBeforeCreate = async (data) => {
  return await STUDY_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newDataToAdd = {
      ...validData,
      owner : new ObjectId(validData.owner)
    }
    const createdStudy = await GET_DB()
      .collection(STUDY_COLLECTION_NAME)
      .insertOne(newDataToAdd)
    return createdStudy
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (studyId) => {
  try {
    const result = await GET_DB()
      .collection(STUDY_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(studyId) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (studyId) => {
  try {
    const result = await GET_DB()
      .collection(STUDY_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(studyId)
          }
        },
        {
          $lookup: {
            from: postModel.POST_COLLECTION_NAME,
            localField: 'listPost',
            foreignField: '_id',
            as: 'PostInfo'
          }
        }
      ]).toArray()
    return result[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const updateStudy = async (studyId, updateData) => {
  try {
    // Lọc những field mà chúng ta không cho phép cập nhật linh tinh
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete updateData[fieldName]
      }
    })

    const result = await GET_DB()
      .collection(STUDY_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(studyId) },
        { $set: updateData },
        { returnDocument: 'after' } // sẽ trả về kết quả mới sau khi cập nhật
      )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const pushToListPost = async (getStudyId, postId) => {
  try {
    const result = await GET_DB().collection(STUDY_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(getStudyId) },
      { $push: { listPost: new ObjectId(postId) } },
      { returnDocument: 'after' }
    )
    return result
  } catch (error) { throw new Error(error) }
}

const updateCommentBoxId = async (id, commentBoxId) =>
{
  try {
    const result = await GET_DB().collection(studyModel.STUDY_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: {
        commentBoxId: commentBoxId
      } },
      { returnDocument: 'after' } // returns the updated document.
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async () => {
  try {
    const result = await GET_DB()
      .collection(STUDY_COLLECTION_NAME)
      .aggregate([
        {
          $group : {
            _id: '$khoa',
            studies: { $push: '$$ROOT' }
          }
        }
      ])
      .toArray()
    return result || null
  } catch (error) {
    throw new Error(error)
  }
}

const getStudyLearning = async (userId) => {
  try {
    const result = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(userId)
          }
        },
        {
          $lookup: {
            from: studyModel.STUDY_COLLECTION_NAME,
            localField: 'study',
            foreignField: '_id',
            as: 'groupInfo'
          }
        }
      ])
      .toArray()
    return result[0].groupInfo || null
  } catch (error) {
    throw new Error(error)
  }
}

export const studyModel = {
  STUDY_COLLECTION_NAME,
  STUDY_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  updateStudy,
  pushToListPost,
  updateCommentBoxId,
  getAll,
  getStudyLearning
}
