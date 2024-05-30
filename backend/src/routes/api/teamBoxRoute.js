import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { teamBoxController } from '~/controllers/teamBoxController'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get teamBox.' })
  })
  .post(teamBoxController.createNew)

export const teamBoxRoute = Router