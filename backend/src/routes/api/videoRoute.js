import express from "express";
import { StatusCodes } from "http-status-codes";
import { videoController } from "~/controllers/videoController";
import { videoValidation } from "~/validations/videoValidation";

const Router = express.Router();

Router.route("/").get((req, res) => {
  res.status(StatusCodes.OK).json({ message: "GET: API get list video" });
});

Router.route("/GetAllVideo").get(videoController.getDetailsAllVideos);
Router.route("/UpdateVideo/:id").put(videoController.updateVideosOfItem); // truyen id va update
Router.route("/DeleteVideo/:id").delete(videoController.deleteVideoOfItem); // truyen id video
Router.route("/DeleteCommentBox/:id").delete(
  videoController.deleteOneCommentBox
); // truyen id cbox
Router.route("/GetListVideo/:id").get(videoController.getListVideoOfItem); // truyen id item
Router.route("/CreateNewVideo").post(videoController.createNewVideosOfItem); // truyen id item
// API hỗ trợ việc di chuyển card giữa các column khác nhau trong một board

export const videoRoute = Router;
