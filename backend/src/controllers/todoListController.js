import { StatusCodes } from 'http-status-codes'
import { todoListService } from '~/services/todoListService'

const createNew = async (req, res, next) => {

  try {
    // Direct data to Service
    const createdBoardList = await todoListService.createNew(req.body)

    // Return response to Client
    res.status(StatusCodes.CREATED).json({ createdBoardList })
  } catch (error) {
    next(error)
  }
}

const deleteToDoList = async (req, res, next) => {
  try {
    const todoListId = req.params.id
    const result = await todoListService.deleteToDoList(todoListId)

    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

export const todoListController = {
  createNew,
  deleteToDoList
}