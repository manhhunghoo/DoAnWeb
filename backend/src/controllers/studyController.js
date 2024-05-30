import { StatusCodes } from 'http-status-codes'
import { studyService } from '~/services/studyService'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service
    const createdpost = await studyService.createNew(req.body)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdpost)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const itemId = req.params.id
    const item = await studyService.getDetails(itemId)
    res.status(StatusCodes.OK).json(item)
  } catch (error) {
    next(error)
  }
}

const updateStudy = async (req, res, next) => {
  try {
    const itemId = req.params.id
    const updatedItem = await studyService.updateStudy(itemId, req.body)

    res.status(StatusCodes.OK).json(updatedItem)
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const studies = await studyService.getAll()
    res.status(StatusCodes.OK).json(studies)
  } catch (error) {
    next(error)
  }
}

const joining = async (req, res, next) => {
  try {
    const itemId = req.params.id
    const item = await studyService.joining(itemId, req.body)
    res.status(StatusCodes.OK).json(item)
  } catch (error) {
    next(error)
  }
}

const getLearning = async (req, res, next) => {
  try {
    const studentId = req.params.id
    const item = await studyService.getStudyLearning(studentId)
    res.status(StatusCodes.OK).json(item)
  } catch (error) {
    next(error)
  }
}

export const studyController = {
  createNew,
  getDetails,
  updateStudy,
  getAll,
  joining,
  getLearning
}
