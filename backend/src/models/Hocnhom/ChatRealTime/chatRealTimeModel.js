import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


// Define Collection (Name & Schema)
const CHATREALTIME_COLLECTION_NAME = 'chatrealtimes'
const CHATREALTIME_COLLECTION_SCHEMA = Joi.object({
  messageModel: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),
  conversationMem: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),
  teamBoxId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const validateBeforeCreate = async (data) =>
{
  return await CHATREALTIME_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) =>
{
  try {
    const validData = await validateBeforeCreate(data)
    const createdChat = await GET_DB().collection(CHATREALTIME_COLLECTION_NAME).insertOne(validData)
    return createdChat
  } catch (error) {throw new Error(error)}
}
const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(CHATREALTIME_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result || null
  } catch (error) {
    throw new Error(error)
  }
}

const pushMemList = async (id, chatRealTimeId) => {
  try {
    const result = await GET_DB().collection(CHATREALTIME_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(chatRealTimeId) },
      { $push: { conversationMem: new ObjectId(id) } },
      { returnDocument: 'after' }
    )
    return result
  } catch (error) { throw new Error(error) }
}

const pullMemList = async (id, chatRealTimeId) => {
  try {
    const result = await GET_DB().collection(CHATREALTIME_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(chatRealTimeId) },
      { $pull: { conversationMem: new ObjectId(id) } },
      { returnDocument: 'after' }
    )
    return result
  } catch (error) { throw new Error(error) }
}

const pushChatList= async (messageModel) => {
  try {
    const result = await GET_DB().collection(CHATREALTIME_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(messageModel.chatRealTimeId) },
      { $push: { messageModel: new ObjectId(messageModel._id) } },
      { returnDocument: 'after' }
    )
    return result
  } catch (error) { throw new Error(error) }
}

const pullChatList= async (messageModel) => {
  try {
    const result = await GET_DB().collection(CHATREALTIME_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(messageModel.chatRealTimeId) },
      { $pull: { messageModel: new ObjectId(messageModel._id) } },
      { returnDocument: 'after' }
    )
    return result
  } catch (error) { throw new Error(error) }
}

export const chatRealTimeModel ={
  CHATREALTIME_COLLECTION_NAME,
  createNew,
  findOneById,
  pushMemList,
  pullMemList,
  pushChatList,
  pullChatList
}