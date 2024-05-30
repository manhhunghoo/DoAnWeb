import { StatusCodes } from 'http-status-codes'
import { chatRealTimeService } from '~/services/chatRealTimeService'


const createNew = async (req, res, next) => {

  try {
    // Direct data to Service
    const createdChat = await chatRealTimeService.createNew(req.body)

    // Return response to Client
    res.status(StatusCodes.CREATED).json({ createdChat })
  } catch (error) {
    next(error)
  }
}
export const chatRealTimeController = {
  createNew
}