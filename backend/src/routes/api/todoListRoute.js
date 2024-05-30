import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { todoListValidation } from '~/validations/todoListValidation'
import { todoListController } from '~/controllers/todoListController'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get todoList.' })
  })
  .post(todoListValidation.createNew, todoListController.createNew)

Router.route('/:id')
  .delete(todoListValidation.deleteToDoList, todoListController.deleteToDoList)
export const todoListRoute = Router