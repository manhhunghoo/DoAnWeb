import { StatusCodes } from 'http-status-codes'
import { teamBoxService } from '~/services/teamBoxService'


const createNew = async (req, res, next) => {

  try {
    // Direct data to Service
    const createdTeamBox = await teamBoxService.createNew(req.body)

    // Return response to Client
    res.status(StatusCodes.CREATED).json({ createdTeamBox })
  } catch (error) {
    next(error)
  }
}
export const teamBoxController = {
  createNew
}