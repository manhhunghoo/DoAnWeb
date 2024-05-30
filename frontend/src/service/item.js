
import * as httpRequest from '../utils/httpRequest'
const GetAllItem = async () => {
    try {
        const response = await httpRequest.get('/items/GetAllItem')
        return response
    } catch (error) {
        throw error.response
    }
}

const createItemOfCourse = async (data) => {
    try {
        console.log(data)
        const response = await httpRequest.post('/items/Teacher/Item', data)
        return response
    } catch (error) {
        throw error.response
    }
}

const updateDataItemOfCourse = async (data) => {
    try {
        const response = await httpRequest.put('/items/Teacher/Item', data)
        return response
    } catch (error) {
        throw error.response
    }
}

const deleteItemOfCourse = async (id) => {
    try {
        const response = await httpRequest.remove(`/items/Teacher/DeleteItem/${id}`)
        return response
    } catch (error) {
        throw error.response
    }
}

const deleteOneVideo = async (id) => {
    try {
        const response = await httpRequest.remove(`/items/Teacher/Item/DeleteOneVideo/${id}`)
        return response
    } catch (error) {
        throw error.response
    }
}

const deleteOneNoti = async (id) => {
    try {
        const response = await httpRequest.remove(`/items/Teacher/Item/DeleteOneNoti/${id}`)
        return response
    } catch (error) {
        throw error.response
    }
}

const deleteOnePost = async (id) => {
    try {
        const response = await httpRequest.remove(`/items/Teacher/Item/DeleteOnePost/${id}`)
        return response
    } catch (error) {
        throw error.response
    }
}

const getListItemOfCourse = async (id) => {
    try {
        const response = await httpRequest.get(`/items/Getlist/${id}`)
        return response
    } catch (error) {
        throw error.response
    }
}

export {
    GetAllItem,
    createItemOfCourse,
    updateDataItemOfCourse,
    deleteItemOfCourse,
    deleteOneVideo,
    deleteOneNoti,
    deleteOnePost,
    getListItemOfCourse,
}