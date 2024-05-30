import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import {
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE,
  EMAIL_RULE,
  TEXT_RULE,
} from "~/utils/validators";
import bcrypt from "bcryptjs";
import { teacherModel } from "./teacherModel";
const USER_COLLECTION_NAME = "users";
const USER_COLLECTION_SCHEMA = Joi.object().keys({
  //email thi nen loc tu FE nhung o day se loc lai
  email: Joi.string().required().email().pattern(EMAIL_RULE).trim().strict(),
  username: Joi.string().required().pattern(TEXT_RULE).trim().strict(),
  password: Joi.string().required().pattern(TEXT_RULE).trim().strict(),
  salt: Joi.string().trim().strict().default(""),
  role: Joi.string().trim().default("student"),
  course: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  examResult: Joi.array().items(
    Joi.object({
      coursename: Joi.string()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE)
        .required(),
      markObtain: Joi.number().required(),
      hoanthanh: Joi.boolean().required(),
    })
  ),
  study: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  group: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  description: Joi.string().trim().strict(),
  admin: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .required(),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  status: Joi.boolean().default(false),
  linkimage: Joi.string().trim().strict().default(""),
});

const INVALID_UPDATE_FIELDS = ["_id", "createdAt"];

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const existingStudent = await GET_DB()
      .collection(USER_COLLECTION_NAME)
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
        .collection(USER_COLLECTION_NAME)
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
      .collection(USER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(ids) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const getDetails = async (id) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetailsAll = async () => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .find()
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const findCourse = async (ids) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .find({ course: { $in: [ids] } })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteManyCourse = async (ids) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .deleteMany({ course: { $in: new ObjectId(ids) } });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteManyTeacher = async (ids) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .deleteMany({ owner: { $in: new ObjectId(ids) } });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deletedOneCourse = async (ids) => {
  try {
    const existstudent = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .updateMany(
        { course: { $in: [ids] } },
        { $pull: { course: { $in: [ids] } } }
      );
    return existstudent;
  } catch (error) {
    throw new Error(error);
  }
};

const deletedStudents = async (ids) => {
  try {
    const deleted = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .deleteOne({ _id: new Object(ids) });
    return deleted;
  } catch (error) {
    throw new Error(error);
  }
};

const checkExist = async (email, password) => {
  try {
    const emailex = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ email: email });

    if (emailex != null) {
      let hash = bcrypt.hashSync(password, emailex.salt);
      if (hash == emailex.password) {
        return emailex;
      } else {
        return null;
      }
    }
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

const pushToGroup = async (getGroup, userId) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $push: { group: new ObjectId(getGroup._id) } },
        { returnDocument: "after" }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const pushToStudy = async (studyId, userId) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $push: { study: new ObjectId(studyId) } },
        { returnDocument: "after" }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneByEmail = async (email) => {
  try {
    const result = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .findOne({
        email: email,
      });
    console.log("findone", result);
    return result != null ? result : null;
  } catch (error) {
    throw new Error(error);
  }
};

const changeOnline = async (userId) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            status: true,
          },
        },
        { returnDocument: "after" } // sẽ trả về kết quả mới sau khi cập nhật
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const changeOffline = async (userId) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            status: false,
          },
        },
        { returnDocument: "after" } // sẽ trả về kết quả mới sau khi cập nhật
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllUserOnline = async () => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            status: true,
          },
        },
      ])
      .toArray();
    return result || null;
  } catch (error) {
    throw new Error(error);
  }
};

const pullToGroup = async (getGroup, userId) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $pull: { group: new ObjectId(getGroup._id) } },
        { returnDocument: "after" }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

// ở trong 1 class xây dựng những cái hàm tương tác với từng field như thêm sửa xóa cập nhật
export const studentModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  // Những hàm này là tương tác với User
  createNew,
  findOneById,
  update,
  getDetails,
  getDetailsAll,
  getIds,
  checkExist,
  findCourse,
  pushToGroup,
  pushToStudy,
  findOneByEmail,
  changeOnline,
  changeOffline,
  getAllUserOnline,
  pullToGroup, // xóa khỏi group

  //deleteCourse
  deletedOneCourse,
  deletedStudents,

  // 2 ham nay chua xac dinh nha
  deleteManyCourse,
  deleteManyTeacher,
};
