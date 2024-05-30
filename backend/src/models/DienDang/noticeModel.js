import Joi, { required } from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import {
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE,
  EMAIL_RULE,
  TEXT_RULE,
} from "~/utils/validators";
import { eventModel } from "./eventNotiModel";
import { studentModel } from "../studentModel";

const NOTICE_COLLECTION_NAME = 'notice'
const NOTICE_COLLECTION_SCHEMA = Joi.object().keys({
  //email thi nen loc tu FE nhung o day se loc lai
  title: Joi.string().trim().required(),
  detail: Joi.string().trim().required(),
  admin: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .required(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now)
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
  return await NOTICE_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createdUser = await GET_DB()
      .collection(NOTICE_COLLECTION_NAME)
      .insertOne(validData);
    const tenevent = "THONG BAO DIEN DAN";
    const liststudent = await studentModel.getDetailsAll();
    const idList = liststudent.map((student) => student._id);
    const createdEvent = await eventModel.createNew(
      tenevent,
      createdUser.insertedId,
      idList
    );
    return createdUser;
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (ids) => {
  try {
    const result = await GET_DB()
      .collection(NOTICE_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(ids) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const getDetails = async (id) => {
  try {
    const result = await GET_DB()
      .collection(NOTICE_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getDetailsAll = async () => {
  try {
    const result = await GET_DB()
      .collection(NOTICE_COLLECTION_NAME)
      .find()
      .toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const noticeModel = {
  NOTICE_COLLECTION_NAME,
  NOTICE_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  getDetailsAll
}
