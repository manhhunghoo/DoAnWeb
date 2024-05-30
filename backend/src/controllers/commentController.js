import { StatusCodes } from "http-status-codes";
import { commentService } from "~/services/commentService";

const createNewComment = async (req, res, next) => {
  try {
    const createdcomment = await commentService.createNewComment(req.body);
    res.status(StatusCodes.CREATED).json(createdcomment);
  } catch (error) {
    next(error);
  }
};

const findOneById = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await commentService.findOneById(itemId);
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const messageId = req.params.id;
    const updatedMessage = await commentService.update(messageId, req.body);

    res.status(StatusCodes.OK).json(updatedMessage);
  } catch (error) {
    next(error);
  }
};

const DeleteComment = async (req, res, next) => {
  try {
    const commentid = req.params.id;
    const result = await commentService.DeleteComment(commentid);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};
const deleteMessage = async (req, res, next) => {
  try {
    const messageModelId = req.params.id;
    const result = await commentService.deleteMessage(messageModelId);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const commentController = {
  createNewComment,
  findOneById,
  update,
  deleteMessage,
  DeleteComment,
};
