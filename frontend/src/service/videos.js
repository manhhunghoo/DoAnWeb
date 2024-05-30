import * as httpRequest from "../utils/httpRequest";

export const getVideos = async () => {
    try {
        const response = await httpRequest.get('/videos/')
        return response
    } catch (error) {
        throw error.response
    }
} // lấy danh sách video từ api
export const getVideoOfItem = async (id) => { // id lớp học
    try {
        const response = await httpRequest.get(`/videos/GetListVideo/${id}`)
        return response
    } catch (error) {
        throw error.response
    }
}

export const addVideo = async (data) => { // id lớp hoc
    try {
        const response = await httpRequest.post(`videos/CreateNewVideo`, data)
        return response
    } catch (error) {
        throw error.response
    }
}

export const updateVideo = async (id, data) => {
    try {
        const response = await httpRequest.put(`/videos/${id}`, data)
        return response
    } catch (error) {
        throw error.response
    }
}

export const deleteVideo = async (id) => {
    try {
        const response = await httpRequest.remove(`/videos/DeleteVideo/${id}`)
        return response
    } catch (error) {
        throw error.response
    }
}
// import express from "express";
// import { StatusCodes } from "http-status-codes";
// import { videoController } from "~/controllers/videoController";
// import { videoValidation } from "~/validations/videoValidation";

// const Router = express.Router();

// Router.route("/")
//   .get((req, res) => {
//     res.status(StatusCodes.OK).json({ message: "GET: API get list video" });
//   })
//   .post(videoValidation.createNew, videoController.createNew);

// Router.route("/:id")
//   .get(videoController.getDetails)
//   .put(videoValidation.updateItem, videoController.updateVideo);

// // API hỗ trợ việc di chuyển card giữa các column khác nhau trong một board

// export const videoRoute = Router;
