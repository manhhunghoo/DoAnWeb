import { groupModel } from '~/models/Hocnhom/groupModel'
import { teamBoxModel } from '~/models/Hocnhom/teamboxModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Handle data according to each project
    const newTeamBox = {
      ...reqBody
    }
    // Call model layer to save record into database
    const createdTeamBox = await teamBoxModel.createNew(newTeamBox)

    // Get chat list after calling (optional)
    const getNewTeamBox = await teamBoxModel.findOneById(createdTeamBox.insertedId)

    await groupModel.updateTeamBoxId(getNewTeamBox.groupId,getNewTeamBox._id)
    // Return result note: have to return in Service
    return getNewTeamBox
  } catch (error) { throw error }
}
export const teamBoxService ={
  createNew
}