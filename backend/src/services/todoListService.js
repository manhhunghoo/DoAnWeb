/* eslint-disable no-useless-catch */
import { todoListModel } from '~/models/Hocnhom/ToDoList/toDoListModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { columnModel } from '~/models/Hocnhom/ToDoList/columnModel'
import { cardModel } from '~/models/Hocnhom/ToDoList/cardModel'
import { boardModel } from '~/models/Hocnhom/ToDoList/boardModel'
import { teamBoxModel } from '~/models/Hocnhom/teamboxModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Handle data according to each project
    const newBoardList = {
      ...reqBody
    }
    // Call model layer to save record into database
    const createdBoardList = await todoListModel.createNew(newBoardList)

    // Get record board after calling (optional)
    const getNewBoardList = await todoListModel.findOneById(createdBoardList.insertedId)

    await teamBoxModel.updateTodoListId(getNewBoardList.teamBoxId, getNewBoardList._id)
    // Return result note: have to return in Service
    return getNewBoardList
  } catch (error) { throw error }
}

const deleteToDoList = async (todoListId) => {
  try {
    const targetToDoList = await todoListModel.findOneById(todoListId)

    if (!targetToDoList) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'ToDoList not found!')
    }
    const boardIds = targetToDoList.boardList
    for (const boardId of boardIds)
    {
      const targetBoard = await boardModel.findOneById(boardId)
      const columnIds = targetBoard.listColumn
      for (const columnId of columnIds)
      {
        await cardModel.deleteManyByColumnId(columnId)
      }
      await columnModel.deleteManyByBoardId(boardId)
      await boardModel.deleteOneById(boardId)
    }
    await todoListModel.deleteOneById(todoListId)
    return { deleteResult: 'ToDoList deleted successfully!' }
  } catch (error) { throw error }
}

export const todoListService =
{
  createNew,
  deleteToDoList
}