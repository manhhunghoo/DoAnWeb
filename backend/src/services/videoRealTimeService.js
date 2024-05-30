import { videoRealTimeModel } from '~/models/Hocnhom/videoRealTimeModel'
import { teamBoxModel } from '~/models/Hocnhom/teamboxModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Handle data according to each project
    const newVideo = {
      ...reqBody
    }
    // Call model layer to save record into database
    const createdVideo = await videoRealTimeModel.createNew(newVideo)

    // Get chat list after calling (optional)
    const getNewVideo = await videoRealTimeModel.findOneById(createdVideo.insertedId)

    await teamBoxModel.updateVideoRealTimeId(getNewVideo.teamBoxId, getNewVideo._id)
    // Return result note: have to return in Service
    return getNewVideo
  } catch (error) { throw error }
}
export const videoRealTimeService ={
  createNew
}