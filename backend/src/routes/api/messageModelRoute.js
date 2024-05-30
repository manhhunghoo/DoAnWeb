import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { messageModelValidation } from '~/validations/messageModelValidation'
import { messageModelController } from '~/controllers/messageModelController'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get messageModel.' })
  })
  .post(messageModelValidation.createNew, messageModelController.createNew)

Router.route('/:id')
  .put(messageModelValidation.update, messageModelController.update)
  .delete(messageModelValidation.deleteMessage, messageModelController.deleteMessage)
export const messageModelRoute = Router