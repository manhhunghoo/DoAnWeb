import * as httpRequest from '../utils/httpRequest'

export const getDocuments = async () => {
    try {
        const response = await httpRequest.get('/documents/')
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const getDocument = async (id,data) => {
    try {
        const response = await httpRequest.get(`/document/${id}`,data)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const addDocument = async (data) => {
    try {
        const response = await httpRequest.post('/document/', data)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateDocument = async (id, data) => {
    try {
        const response = await httpRequest.put(`/document/${id}`, data)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}
