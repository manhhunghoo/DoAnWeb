import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

// Define Collection (Name & Schema)
const VIDEOREALTIME_COLLECTION_NAME = 'videorealtimes'
const VIDEOREALTIME__COLLECTION_SCHEMA = Joi.object({
  videoRealTimeId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  teamBoxId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
})

const validateBeforeCreate = async (data) =>
{
  return await VIDEOREALTIME__COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) =>
{
  try {
    const validData = await validateBeforeCreate(data)
    const createMessage = await GET_DB().collection(VIDEOREALTIME_COLLECTION_NAME).insertOne(validData)
    return createMessage
  } catch (error) {throw new Error(error)}
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(VIDEOREALTIME_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const videoRealTimeModel ={
  createNew,
  findOneById
}