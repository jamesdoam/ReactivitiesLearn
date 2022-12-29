import axios, { AxiosResponse } from 'axios';


axios.defaults.baseURL = 'http://localhost:5000/api';
/* we pass in the response from axios (type AxiosResponse) */
const responseBody = (response:AxiosResponse) => response.data;

/* create an object that stores the common requests that we're gonna make to axios */
const requests = {
    get: (url:string) => axios.get(url).then(responseBody),
    post: (url:string, body: {}) => axios.post(url,body).then(responseBody), /*body of type object */
    put: (url:string, body: {}) => axios.put(url,body).then(responseBody),
    del: (url:string) => axios.delete(url).then(responseBody),
}

/* create an object that store the requests for our activities */
const Activities = {
    list: () => requests.get('/activities') /*baseURL is already in this request url*/
}

/*create an object that we're gonna use */
const agent = {
    Activities
}

export default agent;
