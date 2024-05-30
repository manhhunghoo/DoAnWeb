import Joi, { required } from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import {
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE,
  EMAIL_RULE,
  TEXT_RULE,
} from "~/utils/validators";
import bcrypt from "bcryptjs";


const MESSENGER_COLLECTION_NAME = "messengers";
const MESSENGER_COLLECTION_SCHEMA = Joi.object().keys({
  userid: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .required(), // ycau
  username: Joi.string().trim(),
  code: Joi.string().required().trim(),
  message: Joi.string().required().trim().strict().required(), // yeu cau
  linkimage: Joi.string().trim(),
  createdAt: Joi.date().iso().default(Date.now),
});

const INVALID_UPDATE_FIELDS = ["_id", "createdAt"];

const validateBeforeCreate = async (data) => {
  return await MESSENGER_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const createMessage = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    const createMessage = await GET_DB()
      .collection(MESSENGER_COLLECTION_NAME)
      .insertOne(validData);
    return createMessage;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (ids) => {
  try {
    const result = await GET_DB()
      .collection(ADMIN_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(ids) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneByemail = async (email) => {
  try {
    const result = await GET_DB()
      .collection(ADMIN_COLLECTION_NAME)
      .findOne({ email: email });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const getDetails = async (id) => {
  try {
    const result = await GET_DB()
      .collection(ADMIN_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetailsAll = async () => {
  try {
    const result = await GET_DB()
      .collection(ADMIN_COLLECTION_NAME)
      .find()
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetailsbyEmail = async (email) => {
  try {
    const result = await GET_DB()
      .collection(ADMIN_COLLECTION_NAME)
      .findOne({ email: email });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const checkExist = async (email, password) => {
  try {
    const emailex = await GET_DB()
      .collection(ADMIN_COLLECTION_NAME)
      .findOne({ email: email });
    console.log(emailex);
    if (emailex != null) {
      console.log(emailex.password);
      let hash = bcrypt.hashSync(password, emailex.salt);
      console.log(hash);
      if (hash == emailex.password) {
        console.log("Da vao day");
        return emailex;
      }
      console.log("KHong vao day2");
      return null;
    }
    console.log("KHong vao day1");
    return null;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (userId, updateData) => {
  try {
    // Lọc những field mà chúng ta không cho phép cập nhật linh tinh
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete updateData[fieldName];
      }
    });

    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: updateData },
        { returnDocument: "after" } // sẽ trả về kết quả mới sau khi cập nhật
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getIds = async (mssv) => {
  try {
    // Hôm nay tạm thời giống hệt hàm findOneById - và sẽ update phần aggregate tiếp ở những video tới
    // const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    const string = mssv + "@gm.uit.edu.vn";
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            email: string,
          },
        },
      ])
      .toArray();

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const getAllChatOfGroup = async (idcode) => {
  try {
    const finder = await GET_DB()
      .collection(messengerModel.MESSENGER_COLLECTION_NAME)
      .find({ code: idcode })
      .toArray();
    return finder;
  } catch (error) {
    throw new Error(error);
  }
};

export const messengerModel = {
  MESSENGER_COLLECTION_NAME,
  MESSENGER_COLLECTION_SCHEMA,
  findOneById,
  update,
  getDetails,
  getDetailsAll,
  getIds,
  checkExist,
  findOneByemail,
  getDetailsbyEmail,
  createMessage,
  getAllChatOfGroup,
};
