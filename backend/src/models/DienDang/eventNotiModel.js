import Joi, { required } from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import {
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE,
  EMAIL_RULE,
  TEXT_RULE,
} from "~/utils/validators";
import { courseModel } from "../Khoahoc/courseModel";
import e, { response } from "express";
import { cboxModel } from "../Monhoc/commentboxModel";
import { StatusCodes } from "http-status-codes";

const EVENT_COLLECTION_NAME = "events";
const EVENT_COLLECTION_SCHEMA = Joi.object().keys({
  //email thi nen loc tu FE nhung o day se loc lai
  nameevent: Joi.string().trim().required(),
  own: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .required(), // Thuoc ve su kien nao dang bai tap hay la dang dien dan
  listimpact: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .required(),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
});

const INVALID_UPDATE_FIELDS = ["_id", "createdAt"];

const validateBeforeCreate = async (data) => {
  return await EVENT_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};
const createNew = async (tenevent, idevent, listimpact) => {
  try {
    const getListImpactIds = (jsonArray) => {
      const listimpact = jsonArray.map((item) => String(item._id));
      return listimpact;
    };
    const list = getListImpactIds(listimpact);
    console.log("list", list);
    const data = {
      nameevent: tenevent,
      own: String(idevent),
      listimpact: list,
    };
    const validData = await validateBeforeCreate(data);
    const created = await GET_DB()
      .collection(EVENT_COLLECTION_NAME)
      .insertOne(validData);
    return created;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (ids) => {
  try {
    const result = await GET_DB()
      .collection(EVENT_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(ids) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetailsAll = async (req, res, next) => {
  try {
    const result = await GET_DB()
      .collection(EVENT_COLLECTION_NAME)
      .find()
      .toArray();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const getEventOfStudent = async (req, res, next) => {
  try {
    const result = await GET_DB()
      .collection(eventModel.EVENT_COLLECTION_NAME)
      .find({ listimpact: String(req.params.id) })
      .toArray();

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const eventModel = {
  EVENT_COLLECTION_NAME,
  EVENT_COLLECTION_SCHEMA,

  findOneById,

  //Danh cho Teacher va Hocsinh
  createNew,
  getDetailsAll,
  getEventOfStudent,
};
