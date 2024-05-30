import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { videoRealTimeController } from '~/controllers/videoRealTimeController'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get video real time.' })
  })
  .post(videoRealTimeController.createNew)

export const videoRealTimeRoute = Router