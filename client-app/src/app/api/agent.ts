import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})
/* we pass in the response from axios (type AxiosResponse) */
const responseBody = <T> (response:AxiosResponse<T>) => response.data;

/* create an object that stores the common requests that we're gonna make to axios */
const requests = {
    get: <T> (url:string) => axios.get<T>(url).then(responseBody),
    post: <T>(url:string, body: {}) => axios.post<T>(url,body).then(responseBody), /*body of type object */
    put: <T>(url:string, body: {}) => axios.put<T>(url,body).then(responseBody),
    del: <T>(url:string) => axios.delete<T>(url).then(responseBody),
}

/* create an object that store the requests for our activities */
const Activities = {
    list: () => requests.get<Activity[]>('/activities') /*baseURL is already in this request url*/
}

/*create an object that we're gonna use */
const agent = {
    Activities
}

export default agent;
