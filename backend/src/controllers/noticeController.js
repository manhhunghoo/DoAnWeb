import { StatusCodes } from 'http-status-codes'
import { complainModel } from '~/models/DienDang/complainModel'
import { noticeModel } from '~/models/DienDang/noticeModel'
import { baitapModel } from '~/models/Khoahoc/filebainopModel'
import { postModel } from '~/models/Khoahoc/postModel'
import { baitapService } from '~/services/baitapService'
import { boardService } from '~/services/boardService'
import { itemService } from '~/services/itemService'
import { postService } from '~/services/postService'
import { videoService } from '~/services/videoService'

const createNewbyAdmin = async (req, res, next) => {
  try {
    const creatednotice = await noticeModel.createNew(req.body)
    res.status(StatusCodes.CREATED).json(creatednotice)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const itemId = req.params.id
    const item = await noticeModel.getDetails(itemId)
    res.status(StatusCodes.OK).json(item)
  } catch (error) {
    next(error)
  }
}

const getDetailsAll = async () => {
  try {
    const item = await noticeModel.getDetailsAll()
    res.status(StatusCodes.OK).json(item)
  } catch (error) {
    next(error)
  }
}

export const noticeController = {
  // Danh cho Admin
  createNewbyAdmin,

  //Danh cho sinh vien va teacher
  getDetails,
  getDetailsAll
}
