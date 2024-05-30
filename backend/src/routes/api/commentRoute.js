import express from "express";
import { StatusCodes } from "http-status-codes";
import { commentController } from "~/controllers/commentController";
import { commentValidation } from "~/validations/commentValidation";

const Router = express.Router();

Router.route("/").get((req, res) => {
  res.status(StatusCodes.OK).json({ message: "GET: API get list comemnt" });
});
Router.route("/CreateComment").post(commentController.createNewComment); // truyen vao data can thiet
Router.route("/DeleteComment/:id").delete(commentController.DeleteComment); // truyen vao data can thiet

// API hỗ trợ việc di chuyển card giữa các column khác nhau trong một board

export const commentRoute = Router;
