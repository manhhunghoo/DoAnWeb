import { StatusCodes } from "http-status-codes";
import { userService } from "../services/userService";
import { studentModel, userModel } from "~/models/studentModel";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { courseModel } from "~/models/Khoahoc/courseModel";
import { json } from "express";
import { teacherModel } from "~/models/teacherModel";
import bcrypt from "bcryptjs";

const TeacherRegister = async (req, res, next) => {
  try {
    const createdUser = await teacherModel.createNew(req.body);
    if (createdUser == null) {
      res.status(StatusCodes.BAD_REQUEST).json("Đã tồn tại");
    }
    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(createdUser);
  } catch (error) {
    next(error);
  }
};

const getTeacherDetails = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await userService.getDetails(new ObjectId(userId));
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const getIds = async (req, res, next) => {
  try {
    const mssv = req.params.mssv;
    const user = await userModel.getIds(mssv);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const TeacherLogin = async (req, res, next) => {
  try {
    const user = await teacherModel.checkExist(
      req.params.email,
      req.params.password
    );
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const getTeacherAll = async (req, res, next) => {
  try {
    const teachers = await teacherModel.getDetailsAll();
    res.status(StatusCodes.OK).json(teachers);
  } catch (error) {
    next(error);
  }
};
const updateTeacher = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const news = { ...req.body, password: password, salt: salt };
    const teacher = await teacherModel.update(req.params.id, news);
    const teachers = await teacherModel.findOneById(req.params.id);
    res.status(StatusCodes.OK).json(teachers);
  } catch (error) {
    next(error);
  }
};
export const teacherController = {
  getTeacherAll,
  TeacherRegister,
  getTeacherDetails,
  TeacherLogin,
  getIds,
  updateTeacher,
};
