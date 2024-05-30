import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { commentModel } from "~/models/Monhoc/commentModel";
import { cboxModel } from "~/models/Monhoc/commentboxModel";
import { studentModel } from "~/models/studentModel";

const createNew = async (req, res, next) => {
  try {
    const createdpost = await cboxService.createNew(req.body);

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdpost);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const item = await cboxModel.getDetails();
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};

const findOneById = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await cboxModel.findOneById(itemId);
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await cboxService.getComments(itemId);
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};
const GetListcommentCbox = async (req, res, next) => {
  try {
    const idcBox = req.params.id;
    const listcomment = await GET_DB()
      .collection(commentModel.COMMENT_COLLECTION_NAME)
      .aggregate([
        {
          $match: { commentbox: idcBox },
        },
        {
          $lookup: {
            from: studentModel.USER_COLLECTION_NAME,
            localField: "owner",
            foreignField: "_id",
            as: "ten",
          },
        },
        {
          $project: {
            datatext: 1,
            commentbox: 1,
            "ten.username": 1,
          },
        },
      ])
      .toArray();

    res.status(StatusCodes.OK).json(listcomment);
  } catch (error) {
    next(error);
  }
};

const DeletedCommentinCBox = async (req, res, next) => {
  try {
    const idcBox = req.params.id;
    //xoa khoi commentmodel
    const listcomment = await GET_DB()
      .collection(commentModel.COMMENT_COLLECTION_NAME)
      .deleteMany({ commentbox: idcBox });
    //xoatrong  danhsach cbox
    const update = await GET_DB()
      .collection(cboxModel.COMMENTBOX_COLLECTION_NAME)
      .updateMany(
        {
          _id: new ObjectId(idcBox),
        },
        {
          $set: { listComment: [] },
        }
      );
    console.log(update);
    res.status(StatusCodes.OK).json(listcomment);
  } catch (error) {
    next(error);
  }
};

export const cboxController = {
  createNew,
  getDetails,
  findOneById,
  getComments,
  GetListcommentCbox,
  DeletedCommentinCBox,
};
