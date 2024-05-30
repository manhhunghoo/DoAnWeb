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
import { response } from "express";
import { cboxModel } from "../Monhoc/commentboxModel";
import { StatusCodes } from "http-status-codes";

const COMPLAIN_COLLECTION_NAME = "complain";
const COMPLAIN_COLLECTION_SCHEMA = Joi.object().keys({
  //email thi nen loc tu FE nhung o day se loc lai
  user: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .required(),
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(), // noi dung
  linkPDF: Joi.string().trim().required(), // noi dung
  commenbox: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
});

const INVALID_UPDATE_FIELDS = ["_id", "createdAt"];

const validateBeforeCreate = async (data) => {
  return await COMPLAIN_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    const created = await GET_DB()
      .collection(COMPLAIN_COLLECTION_NAME)
      .insertOne(validData);
    const createcommentbox = await cboxModel.createNew(created.insertedId);
    const push = await GET_DB()
      .collection(complainModel.COMPLAIN_COLLECTION_NAME)
      .updateOne(
        {
          _id: new ObjectId(created.insertedId),
        },
        { $push: { commenbox: String(createcommentbox.insertedId) } }
      );
    return created;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (ids) => {
  try {
    const result = await GET_DB()
      .collection(COMPLAIN_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(ids) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetails = async (id) => {
  try {
    const result = await GET_DB()
      .collection(COMPLAIN_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetailsAll = async () => {
  try {
    const result = await GET_DB()
      .collection(COMPLAIN_COLLECTION_NAME)
      .find()
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const DeleteComplain = async (req, res, next) => {
  try {
    const result = await GET_DB()
      .collection(COMPLAIN_COLLECTION_NAME)
      .findOneAndDelete({ _id: new ObjectId(req.params.id) });
    if (result) {
      const finecom = await GET_DB()
        .collection(cboxModel.COMMENTBOX_COLLECTION_NAME)
        .findOne(
          {
            video: req.params.id,
          },
          {
            _id: 1,
          }
        );
      console.log("finecone", finecom);
      const deletecomentbox = await cboxModel.deleteCommentbox(finecom._id);
      return res.status(StatusCodes.OK).json(result);
    }
    return res
      .status(StatusCodes.FAILED_DEPENDENCY)
      .json({ messenser: "Khong xoa duoc" });
  } catch (error) {
    next(error);
  }
};
const findOnSearch = async (req, res, next) => {
  try {
    const articles = await GET_DB()
      .collection(complainModel.COMPLAIN_COLLECTION_NAME)
      .find({ title: { $regex: req.query.q, $options: "i" } })
      .toArray();
    return res.json(articles);
  } catch (error) {
    next(error);
  }
};

export const complainModel = {
  COMPLAIN_COLLECTION_NAME,
  COMPLAIN_COLLECTION_SCHEMA,

  findOneById,
  getDetails,

  //Danh cho Teacher va Hocsinh
  createNew,
  getDetailsAll,
  findOnSearch,
  DeleteComplain,
};
