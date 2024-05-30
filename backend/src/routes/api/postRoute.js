import express from "express";
import { StatusCodes } from "http-status-codes";
import { postController } from "~/controllers/postController";
import { postValidation } from "~/validations/postValidation";

const Router = express.Router();

Router.route("/").get((req, res) => {
  res.status(StatusCodes.OK).json({ message: "GET: API get list Post" });
});
Router.route("/GetPostAll").get(postController.getDetailsAllPost);
Router.route("/CreateNewPost").post(postController.createNewPostOfItem); // truyen data
Router.route("/UpdatePost/:id").post(postController.updatePostOfItem); // truyen post id va updateData
Router.route("/DeletePost/:id").delete(postController.deletePostOfItem); // truyen id post
Router.route("/Getlist/:id").get(postController.getListPostOfItem); // truyen id item

export const postRoute = Router;
