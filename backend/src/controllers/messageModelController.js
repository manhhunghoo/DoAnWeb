import { StatusCodes } from 'http-status-codes'
import { messageModelService } from '~/services/messageModelService'

const createNew = async (req, res, next) => {

  try {
    // Direct data to Service
    const createdMessage = await messageModelService.createNew(req.body)

    // Return response to Client
    res.status(StatusCodes.CREATED).json({ createdMessage })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const messageId = req.params.id
    const updatedMessage = await messageModelService.update(messageId, req.body)

    res.status(StatusCodes.OK).json(updatedMessage)
  } catch (error) { next(error) }
}

const deleteMessage = async (req, res, next) => {
  try {
    const messageModelId = req.params.id
    const result = await messageModelService.deleteMessage(messageModelId)

    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

export const messageModelController = {
  createNew,
  update,
  deleteMessage
}