import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
import { notiModel } from "./notiModel";

const BAITAP_COLLECTION_NAME = "baitap";
const BAITAP_COLLECTION_SCHEMA = Joi.object({
  nguoinop: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .required(),
  linkpdf: Joi.string().required(),
  noti: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .required(),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
});

const INVALID_UPDATE_FIELDS = ["_id", "createdAt"];

const validateBeforeCreate = async (data) => {
  return await BAITAP_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const createNewBaiTapOfNoti = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    const createdBaitap = await GET_DB()
      .collection(BAITAP_COLLECTION_NAME)
      .insertOne(validData);
    const pushbaitapinNoti = await notiModel.pushListNguoinop(
      data.noti,
      createdBaitap.insertedId
    );
    return createdBaitap;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetailsAllBaiTap = async () => {
  try {
    const result = await GET_DB()
      .collection(BAITAP_COLLECTION_NAME)
      .find()
      .toArray();

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const findOneById = async (baitapId) => {
  try {
    const result = await GET_DB()
      .collection(BAITAP_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(baitapId) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getListPostOfNoti = async (idNoti) => {
  try {
    const listPost = await GET_DB()
      .collection(baitapModel.BAITAP_COLLECTION_NAME)
      .find({
        noti: idNoti,
      })
      .toArray();
    return listPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const baitapModel = {
  BAITAP_COLLECTION_NAME,
  BAITAP_COLLECTION_SCHEMA,
  findOneById,
  // Danh cho Admin
  getDetailsAllBaiTap,

  // Danh cho Teacher
  // truyen data

  // Danh cho hoc sinh
  getListPostOfNoti,
  createNewBaiTapOfNoti, // truyen id noti
};
