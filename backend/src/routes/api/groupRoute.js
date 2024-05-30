import express from "express";
import { StatusCodes } from "http-status-codes";
import { groupController } from "~/controllers/groupController";
import { groupModel } from "~/models/Hocnhom/groupModel";
import { messengerModel } from "~/models/RoomChat/messengetModel";
const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "GET: API get groups." });
  })
  .post(groupController.createNew);

Router.route("/:id").put(groupController.update);
Router.route("/:id/getall").get(groupController.getAll);
Router.route("/:id/getpublic").get(groupController.getGroupOwnByTeacher);
Router.route("/:id/getprivate").get(groupController.getPrivate);

// test
Router.route("/:id/join").put(groupController.joinGroup);
Router.route("/:id/leave").put(groupController.leaveGroup);
Router.route("/:code/getgroup") // get by code
  .get(groupController.getGroup);
Router.route("/:id/getAllgroupByAdmin") // get by id
  .get(groupController.getAllGroupByAdmin);
Router.route("/:code/:owner").delete(groupController.deleteGroupByOwner);
Router.route("/GetGroupOfStudent/:id").get(groupController.GetGroupOfStudent);
Router.route("/GetListStudent/:id").get(groupModel.getListStudentOfGroup);
Router.route("/GetlistMess/:code").get(groupController.getAllChatOfGroup);

export const groupRoute = Router;
