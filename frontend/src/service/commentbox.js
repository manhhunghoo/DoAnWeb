import * as httpRequest from '../utils/httpRequest'

export const getListComments = async (id) => { 
    try {
        return await httpRequest.get( `/cboxs/GetListcommentCbox/${id}`)
    }
    catch (error) {
        throw Error(error)
    }
}