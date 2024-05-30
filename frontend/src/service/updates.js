import * as httpRequest from '../utils/httpRequest'

export const updateUser = async (id, data) => {
    try {
        console.log('data', data)
        const response = await httpRequest.put(`users/UpdateStudent/${id}/`, data)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateTeacher = async (id, data) => {
    try {
        console.log('data', data)
        const response = await httpRequest.put(`teachers/UpdateTeacher/${id}/`, data)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}