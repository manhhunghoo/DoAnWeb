import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
import { studentModel } from "../studentModel";
import { StatusCodes } from "http-status-codes";

const GROUP_COLLECTION_NAME = "groups";
const GROUP_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().required().min(3).max(500).trim().strict(),
  owner: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .required(),
  linkImage: Joi.string().uri().trim().strict().default(""),
  listMem: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  code: Joi.string().required().min(3).max(50).trim().strict(),
  teamBoxId: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
});

const INVALID_UPDATE_FIELDS = ["_id", "owner", "code", "teamBoxId"];

const validateBeforeCreate = async (data) => {
  return await GROUP_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    const newGroupToAdd = {
      ...validData,
      owner: new ObjectId(validData.owner),
    };
    const createdGroup = await GET_DB()
      .collection(GROUP_COLLECTION_NAME)
      .insertOne(newGroupToAdd);
    return createdGroup;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (groupId) => {
  try {
    const result = await GET_DB()
      .collection(GROUP_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(groupId) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (groupId, updateData) => {
  try {
    // Filter field before updating
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete updateData[fieldName];
      }
    });

    if (updateData.listMem) {
      updateData.listMem = updateData.listMem.map((_id) => new ObjectId(_id));
    }

    const result = await GET_DB()
      .collection(GROUP_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(groupId) },
        { $set: updateData },
        { returnDocument: "after" } // returns the updated document.
      );
    return result || null;
  } catch (error) {
    throw new Error(error);
  }
};

const updateTeamBoxId = async (id, teamBoxId) => {
  try {
    const result = await GET_DB()
      .collection(GROUP_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            teamBoxId: teamBoxId,
          },
        },
        { returnDocument: "after" } // returns the updated document.
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAll = async (userId) => {
  try {
    const result = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: groupModel.GROUP_COLLECTION_NAME,
            localField: "_id",
            foreignField: "listMem",
            as: "groupInfo",
          },
        },
      ])
      .toArray();
    return result[0].groupInfo || null;
  } catch (error) {
    throw new Error(error);
  }
};

const getGroupOwnByTeacher = async (userId) => {
  try {
    const result = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: groupModel.GROUP_COLLECTION_NAME,
            localField: "_id",
            foreignField: "listMem",
            as: "groupInfo",
          },
        },
        {
          $unwind: "$groupInfo", // Unwind the groupInfo array
        },
        {
          $lookup: {
            from: studentModel.USER_COLLECTION_NAME,
            localField: "groupInfo.owner",
            foreignField: "_id",
            as: "newGroupInfo",
          },
        },
        {
          $match: {
            "newGroupInfo.role": "GiaoVien", // Filter based on role
          },
        },
        {
          $group: {
            _id: "$_id", // Group back by user ID
            groupInfo: { $push: "$groupInfo" }, // Push the matching groupInfo into an array
          },
        },
      ])
      .toArray();
    return result.length > 0 ? result[0].groupInfo : null;
  } catch (error) {
    throw new Error(error);
  }
};

const getGroupOwnByOther = async (userId) => {
  try {
    const result = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: groupModel.GROUP_COLLECTION_NAME,
            localField: "_id",
            foreignField: "listMem",
            as: "groupInfo",
          },
        },
        {
          $unwind: "$groupInfo", // Unwind the groupInfo array
        },
        {
          $lookup: {
            from: studentModel.USER_COLLECTION_NAME,
            localField: "groupInfo.owner",
            foreignField: "_id",
            as: "newGroupInfo",
          },
        },
        {
          $match: {
            "newGroupInfo.role": { $ne: "GiaoVien" },
          },
        },
        {
          $group: {
            _id: "$_id", // Group back by user ID
            groupInfo: { $push: "$groupInfo" },
          },
        },
      ])
      .toArray();
    return result.length > 0 ? result[0].groupInfo : null;
  } catch (error) {
    throw new Error(error);
  }
};

const pushToListMem = async (getGroup, userId) => {
  try {
    const result = await GET_DB()
      .collection(GROUP_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(getGroup._id) },
        { $push: { listMem: new ObjectId(userId) } },
        { returnDocument: "after" }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneByCode = async (codeId) => {
  try {
    const result = await GET_DB()
      .collection(GROUP_COLLECTION_NAME)
      .find({
        code: codeId,
      })
      .toArray();
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    throw new Error(error);
  }
};

const pullToListMem = async (getGroup, userId) => {
  try {
    const result = await GET_DB()
      .collection(GROUP_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(getGroup._id) },
        { $pull: { listMem: new ObjectId(userId) } },
        { returnDocument: "after" }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllGroupByAdmin = async () => {
  try {
    const result = await GET_DB()
      .collection(GROUP_COLLECTION_NAME)
      .find({})
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteGroupByOwner = async (code, owner) => {
  try {
    const result = await GET_DB()
      .collection(GROUP_COLLECTION_NAME)
      .findOneAndDelete({
        owner: new ObjectId(owner),
        code: code,
      });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getListStudentOfGroup = async (req, res, next) => {
  try {
    const result = await GET_DB()
      .collection(GROUP_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            code: req.params.code,
          },
        },
        {
          $lookup: {
            from: studentModel.USER_COLLECTION_NAME,
            localField: "listMem",
            foreignField: "_id",
            as: "listMemOfGroup",
          },
        },
        {
          $unwind: "$listMemOfGroup",
        },
        {
          $project: {
            // Các trường cần lấy từ bản ghi sinh viên
            listMemOfGroup: 1,
          },
        },
      ])
      .toArray();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const findGroupOfStudent = async (studentid) => {
  try {
    const result = await GET_DB()
      .collection(GROUP_COLLECTION_NAME)
      .find({ listMem: new ObjectId(studentid) })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const groupModel = {
  GROUP_COLLECTION_NAME,
  getAllGroupByAdmin,
  createNew,
  findOneById,
  update,
  updateTeamBoxId,
  getAll,
  getGroupOwnByTeacher,
  getGroupOwnByOther,
  pushToListMem,
  findOneByCode,
  pullToListMem,
  deleteGroupByOwner,
  getListStudentOfGroup,
  findGroupOfStudent,
};
