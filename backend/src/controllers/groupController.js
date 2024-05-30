import { StatusCodes } from "http-status-codes";
import { messengerModel } from "~/models/RoomChat/messengetModel";
import { groupService } from "~/services/groupService";

const createNew = async (req, res, next) => {
  try {
    // Direct data to Service
    const createdGroup = await groupService.createNew(req.body);

    // Return response to Client
    res.status(StatusCodes.CREATED).json({ createdGroup });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const updatedGroup = await groupService.update(groupId, req.body);

    res.status(StatusCodes.OK).json(updatedGroup);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const getAllGroup = await groupService.getAll(userId);

    res.status(StatusCodes.OK).json(getAllGroup);
  } catch (error) {
    next(error);
  }
};

const getGroupOwnByTeacher = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const getAllGroup = await groupService.getGroupOwnByTeacher(userId);

    res.status(StatusCodes.OK).json(getAllGroup);
  } catch (error) {
    next(error);
  }
};

const getPrivate = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const getAllGroup = await groupService.getGroupOwnByOther(userId);

    res.status(StatusCodes.OK).json(getAllGroup);
  } catch (error) {
    next(error);
  }
};

const joinGroup = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const getAllGroup = await groupService.joinGroup(userId, req.body);

    res.status(StatusCodes.OK).json(getAllGroup);
  } catch (error) {
    next(error);
  }
};

const leaveGroup = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const getAllGroup = await groupService.leaveGroup(userId, req.body);

    res.status(StatusCodes.OK).json(getAllGroup);
  } catch (error) {
    next(error);
  }
};

const getGroup = async (req, res, next) => {
  try {
    const code = req.params.code;
    const getAllGroup = await groupService.getGroup(code);

    res.status(StatusCodes.OK).json(getAllGroup);
  } catch (error) {
    next(error);
  }
};

const getAllGroupByAdmin = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    const getAllGroup = await groupService.getAllGroupByAdmin(adminId);

    res.status(StatusCodes.OK).json(getAllGroup);
  } catch (error) {
    next(error);
  }
};
const deleteGroupByOwner = async (req, res, next) => {
  const code = req.params.code;
  const owner = req.params.owner;
  try {
    const result = await groupService.deleteGroupByOwner(code, owner);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const GetGroupOfStudent = async (req, res, next) => {
  const studentid = req.params.id;
  try {
    const result = await groupService.GetGroupOfStudent(studentid);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllChatOfGroup = async (req, res, next) => {
  const codeGroup = req.params.code;
  try {
    const result = await messengerModel.getAllChatOfGroup(codeGroup);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};
export const groupController = {
  getAllChatOfGroup,
  getGroup,
  getAllGroupByAdmin,
  createNew,
  update,
  getAll,
  getGroupOwnByTeacher,
  getPrivate,
  joinGroup,
  leaveGroup,
  deleteGroupByOwner,
  GetGroupOfStudent,
};
