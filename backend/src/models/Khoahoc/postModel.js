import Joi from "joi";
import { isDate } from "lodash";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
import { itemModel } from "./itemModel";

const POST_COLLECTION_NAME = "posts";
const POST_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().required().min(3).max(255).trim().strict(),
  linkPDF: Joi.string().required().trim().strict(),

  item: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message({ OBJECT_ID_RULE_MESSAGE })
    .required(),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
});

const INVALID_UPDATE_FIELDS = ["_id", "createdAt"];

const validateBeforeCreate = async (data) => {
  return await POST_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const createNewPostOfItem = async (data) => {
  const validData = await validateBeforeCreate(data);
  const createdpost = await GET_DB()
    .collection(POST_COLLECTION_NAME)
    .insertOne(validData);
  const getitem = await GET_DB()
    .collection(postModel.POST_COLLECTION_NAME)
    .findOne(
      {
        _id: new ObjectId(createdpost.insertedId),
      },
      { item: 1 }
    );
  console.log(getitem.item);
  const updateItem = await itemModel.pushToListPost(
    getitem.item,
    createdpost.insertedId
  );
  return createdpost;
};

const findOneById = async (postId) => {
  try {
    const result = await GET_DB()
      .collection(POST_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(postId) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetailsAllPost = async () => {
  try {
    const result = await GET_DB()
      .collection(POST_COLLECTION_NAME)
      .find()
      .toArray();

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const deletePostOfItem = async (idPost) => {
  try {
    const deletePost = await GET_DB()
      .collection(postModel.POST_COLLECTION_NAME)
      .deleteOne({
        _id: new ObjectId(idPost),
      });
    console.log("deletePost", deletePost);
    if (deletePost.deletedCount === 1) {
      const deleteItem = await itemModel.deleteOnePost(idPost);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getListPostOfItem = async (idItem) => {
  try {
    const listpost = await GET_DB()
      .collection(postModel.POST_COLLECTION_NAME)
      .find({
        item: idItem,
      })
      .toArray();
    return listpost;
  } catch (error) {
    throw new Error(error);
  }
};
const updatePostOfItem = async (postId, updateData) => {
  try {
    // Lọc những field mà chúng ta không cho phép cập nhật linh tinh
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete updateData[fieldName];
      }
    });

    const result = await GET_DB()
      .collection(POST_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(postId) },
        { $set: updateData },
        { returnDocument: "after" } // sẽ trả về kết quả mới sau khi cập nhật
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const postModel = {
  POST_COLLECTION_NAME,
  POST_COLLECTION_SCHEMA,
  findOneById,
  // Danh cho Admin
  getDetailsAllPost,

  // Danh cho Teacher
  createNewPostOfItem, // truyen data
  updatePostOfItem, //  truyen post id va updateData
  deletePostOfItem, // truyen id Post

  // Danh cho hoc sinh
  getListPostOfItem, // truyen id Item
};
