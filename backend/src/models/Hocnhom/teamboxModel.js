import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

// Define Collection (Name & Schema)
const TEAMBOX_COLLECTION_NAME = 'teamboxs'
const TEAMBOX_COLLECTION_SCHEMA = Joi.object({
  chatRealTimeId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  videoRealTimeId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  todoListId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  groupId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
})

const validateBeforeCreate = async (data) =>
{
  return await TEAMBOX_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) =>
{
  try {
    const validData = await validateBeforeCreate(data)
    const newTeamBoxtoAdd =
    {
      ...validData,
      groupId: new ObjectId(validData.groupId)
    }
    const createMessage = await GET_DB().collection(TEAMBOX_COLLECTION_NAME).insertOne(newTeamBoxtoAdd)
    return createMessage
  } catch (error) {throw new Error(error)}
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(TEAMBOX_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result || null
  } catch (error) {
    throw new Error(error)
  }
}

const updateChatRealTimeId = async (id, chatRealTimeId) =>
{
  try {
    const result = await GET_DB().collection(TEAMBOX_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: {
        chatRealTimeId: chatRealTimeId
      } },
      { returnDocument: 'after' } // returns the updated document.
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const updateVideoRealTimeId = async (id, videoRealTimeId) =>
{
  try {
    const result = await GET_DB().collection(TEAMBOX_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: {
        videoRealTimeId: videoRealTimeId
      } },
      { returnDocument: 'after' } // returns the updated document.
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const updateTodoListId = async (id, todoListId) =>
{
  try {
    const result = await GET_DB().collection(TEAMBOX_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: {
        todoListId: todoListId
      } },
      { returnDocument: 'after' } // returns the updated document.
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const teamBoxModel = {
  createNew,
  findOneById,
  updateChatRealTimeId,
  updateTodoListId,
  updateVideoRealTimeId
}