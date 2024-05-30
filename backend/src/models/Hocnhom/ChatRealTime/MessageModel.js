import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

// Define Collection (name & schema)
const MESSAGE_COLLECTION_NAME = 'messageModel'
const MESSAGE_COLLECTION_SCHEMA = Joi.object({
  senderId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  message: Joi.string().required().min(3).trim().strict().required(),
  chatRealTimeId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const INVALID_UPDATE_FIELDS = ['_id', 'senderId', 'chatRealTimeId']

const validateBeforeCreate = async (data) =>
{
  return await MESSAGE_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) =>
{
  try {
    const validData = await validateBeforeCreate(data)
    const newMessagetoAdd =
    {
      ...validData,
      senderId: new ObjectId(validData.senderId),
      chatRealTimeId: new ObjectId(validData.chatRealTimeId)
    }
    const createMessage = await GET_DB().collection(MESSAGE_COLLECTION_NAME).insertOne(newMessagetoAdd)
    return createMessage
  } catch (error) {throw new Error(error)}
}
const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(MESSAGE_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (messageId, updateData) => {
  try {
    // Filter field before updating
    Object.keys(updateData).forEach(fieldName => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete updateData[fieldName]
      }
    })

    const result = await GET_DB().collection(MESSAGE_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(messageId) },
      { $set: updateData },
      { returnDocument: 'after' } // returns the updated document.
    )
    return result
  } catch (error) { throw new Error(error) }
}


const deleteOneById = async (messageId) => {
  try {
    const result = await GET_DB().collection(MESSAGE_COLLECTION_NAME).deleteOne({ _id: new ObjectId(messageId) })
    return result
  } catch (error) { throw new Error(error) }
}

export const messageModel = {
  MESSAGE_COLLECTION_NAME,
  createNew,
  findOneById,
  update,
  deleteOneById
}