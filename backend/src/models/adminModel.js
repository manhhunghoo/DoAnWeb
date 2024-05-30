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

const ADMIN_COLLECTION_NAME = "admins";
const ADMIN_COLLECTION_SCHEMA = Joi.object().keys({
  email: Joi.string().required().email().pattern(EMAIL_RULE).trim().strict(),
  username: Joi.string().required().pattern(TEXT_RULE).trim(),
  password: Joi.string().required().pattern(TEXT_RULE).trim().strict(),
  salt: Joi.string().trim().strict().default(""),
  role: Joi.string().trim().default("admin"),
  createdAt: Joi.date().iso().default(Date.now),
});

const INVALID_UPDATE_FIELDS = ["_id", "createdAt"];

const validateBeforeCreate = async (data) => {
  return await ADMIN_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const existingStudent = await GET_DB()
      .collection(ADMIN_COLLECTION_NAME)
      .findOne({
        email: data.email,
      });

    if (existingStudent) {
      return null;
    } else {
      const validData = await validateBeforeCreate(data);
      let salt = bcrypt.genSaltSync(10);
      let hashPassword = bcrypt.hashSync(data.password, salt);
      validData.salt = salt;
      validData.password = hashPassword;

      const createdUser = await GET_DB()
        .collection(ADMIN_COLLECTION_NAME)
        .insertOne(validData);
      return createdUser;
    }
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

export const adminModel = {
  ADMIN_COLLECTION_NAME,
  ADMIN_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  update,
  getDetails,
  getDetailsAll,
  getIds,
  checkExist,
  findOneByemail,
  getDetailsbyEmail,
};
