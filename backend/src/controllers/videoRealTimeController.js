import { StatusCodes } from 'http-status-codes'
import { videoRealTimeService } from '~/services/videoRealTimeService'


const createNew = async (req, res, next) => {

  try {
    // Direct data to Service
    const createdVideo = await videoRealTimeService.createNew(req.body)

    // Return response to Client
    res.status(StatusCodes.CREATED).json({ createdVideo })
  } catch (error) {
    next(error)
  }
}
export const videoRealTimeController = {
  createNew
}