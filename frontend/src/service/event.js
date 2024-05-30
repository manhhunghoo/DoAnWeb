import  * as httpRequest from '../utils/httpRequest'

export function getAllEventList() {
    try{
        const response = httpRequest.get('/events/GetDetailAll/')
        return response
    } catch (error) {
        throw error.response
    }
}

export function getStudentEventList(id) {
    try {
        const  response = httpRequest.get(`/events/GetEventOfStudent/${id}`)
        return response 
    } catch (error) {
        throw error.response
    }
}