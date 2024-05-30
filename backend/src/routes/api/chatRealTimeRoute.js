import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { chatRealTimeController } from '~/controllers/chatRealTimeController'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get chatRealTime.' })
  })
  .post(chatRealTimeController.createNew)

export const chatRealTimeRoute = Router