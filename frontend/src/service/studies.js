
import * as httpRequests from '../utils/httpRequest'
// lấy danh sách các lớp học
export const getStudiesAll= async () => {
    try {
        const response = await httpRequests.get('/studies/getall')
        return Array(response)
    } catch (error) {
        throw error.response
    }
}
// lấy thông tin một lớp học
export const getStudyDetail = async (id_study) => { // id_study là id của lớp học đó
    try {
        const response = await httpRequests.get(`/studies/${id_study}`)
        return response
    } catch (error) {
        throw error.response
    }
}
// tạo một lớp học mới
export const createStudy = async (owner,{title,descripton}) => {
    try {
        const data = {
            title,
            descripton,
            owner: owner._id,
            admin: owner._id,
        }
        const response = await httpRequests.post('/studies/', data)
        return response
    } catch (error) {
        throw error.response
    }
}
// cập nhật thông tin một lớp học
export const updateStudy = async (id_study, data) => {
    try {
        const response = await httpRequests.put(`/studies/${id_study}`, data)
        return response
    } catch (error) {
        throw error.response
    }
}


export const addStudent = async (id_study, data) => {
    try {
        const response = await httpRequests.post(`/studies/${id_study}/joining`, data)
        return response
    } catch (error) {
        throw error.response
    }
}

export const getstudylearning = async (id_student) => {
    try {
        const response = await httpRequests.get(`/studies/${id_student}/getstudylearning`)
        return response
    } catch (error) {
        throw error.response
    }
}




// const Router = express.Router()

// Router.route('/')
//   .get((req, res) => {
//     res.status(StatusCodes.OK).json({ message: 'GET: API get list Study' })
//   })
//   .post(studyValidation.createNew, studyController.createNew)

// Router.route('/getall')
//   .get(studyController.getAll)

// Router.route('/:id') //Id of study
//   .get(studyController.getDetails)
//   .put(studyValidation.updateStudy, studyController.updateStudy)

// Router.route('/:id/joining') // Id of study
//   .get(studyController.joining)
// Router.route('/:id/getstudylearning') // Id of student
//   .get(studyController.getLearning)
// // Router.route('/hoanthanh')
// //   .get(studyController.getFinished)

// export const studyRoute = Router
