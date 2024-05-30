import * as httpRequests from '../utils/httpRequest';

const search = async (query) => {
    try {
        const response = await httpRequests.get('/courses/Search',{
            params: {
                q: query
            }
        
        });//await httpRequests.get(`/search?q=${query}`);
        return response
    }
    catch (error) {
        console.error('search error', error);
    }
}

export { search }