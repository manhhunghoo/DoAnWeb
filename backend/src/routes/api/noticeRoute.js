import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { commentController } from '~/controllers/commentController'
import { complainController } from '~/controllers/complainController'
import { noticeController } from '~/controllers/noticeController'

const Router = express.Router()

Router.route('/').get((req, res) => {
  res.status(StatusCodes.OK).json({ message: 'GET: API get NOtice' })
})
//Lấy các API từ Admin
Router.route('/NoticeCreate').post(noticeController.createNew)
Router.route('/Notice/:id').get(noticeController.getDetails)
Router.route('/NoticeList').get(noticeController.getDetailsAll)

// API hỗ trợ việc di chuyển card giữa các column khác nhau trong một board

export const noticeRoute = Router
