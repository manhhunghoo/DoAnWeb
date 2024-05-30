import  * as httpRequest from '../utils/httpRequest'

export const GetCourseAll = async () => {
    try {
        const response = await httpRequest.get('/courses/GetCourseAll/')
        return Array(response)
    } catch (error) {
        throw error.response
    }
}

export const getCourseListTeacher = async (id) => {
    try {
        const response = await httpRequest.get(`/courses/GetListCourseTeacher/${id}`)
        console.log('res',response)
        return response
    } catch (error) {
        throw error.response.data
    } 
}

export const getCourseListStudent = async (id) => {
    try {
        const response = await httpRequest.get(`/courses/GetListCourseStudent/${id}`)
        return response
    } catch (error) {
        throw error.response
    }
}


export const getCourseDetail = async (id_teacher,id_courese) => {
    try {
        const response = await httpRequest.get(`/courses/GetDetailCourse/${id_teacher}/${id_courese}`)
        return response
    } catch (error) {
        throw error.response
    }
}
export const getCoursesStudying = async (id) => {
    const data = id ;
    try {
        const response = await httpRequest.get(`/courses/Khoahoc/Studying/`,data)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const getCoursesDone = async (id) => {
    try {
        const response = await httpRequest.get(`/courses/GetListCoutseDone/${id}`)
        return response
    } catch (error) {
        throw error.response
    }
}

export const createCourse  = async (admin,{title,description,owner,linkimage}) => {
    try {
        const data = {
            title,
            description,
            admin: admin._id,
            owner,
            linkimage,
        }
        const response = await httpRequest.post('/courses/CreateCourse/', data)
        return response
    } catch (error) {
        console.log('err',error)
        throw error.response
    }
}

export const addStudent = async (idcourse , data) => {
    try {
        const students = data
        const response = await httpRequest.post(`/courses/AddListStudentOnCourse/${idcourse}`,students,{
            params: {
                students: JSON.stringify(data)
            }
        })   // id cousesr
        return response
    } catch (error) {
        throw error.response
    }
}   

export const deleteStudent = async (idStudent, idCourse ) => { 
    try {
        const response = await httpRequest.put(`/courses/DeleteStudentCourse/${idStudent}/${idCourse}`)   // id cousesr
        return response
    } catch (error) {
        throw error.response
    }
}

export const GetListStudent = async (id) => {
    try {
        const response = await httpRequest.get(`/courses/GetListStudent/${id}`)
        return response
    } catch (error) {
        throw error.response
    }
}

export const updateCourse = async (id, data) => {
    try {
        const response = await httpRequest.put(`/courses/UpdateCourse/${id}`, data)
        return response
    } catch (error) {
        throw error.response
    }
}

export const deleteCourse = async (id) => {
    try {
        const response = await httpRequest.remove(`/courses/deleteCourse/${id}`)
        return response
    } catch (error) {
        throw error.response
    }
}

export const markStudent = async (idStudent, idCourse, mark) => {
    try {
        const response = await httpRequest.post(`/courses/ChamDiem/${idStudent}/${idCourse}/${mark}`)
        return response
    } catch (error) {
        throw error.response
    }
}

export const getMarkStudent = async (idStudent, idCourse) => {
    try {
        const response = await httpRequest.get(`/courses/GetMark/${idStudent}/${idCourse}`)
        return response
    } catch (error) {
        throw error.response
    }
}