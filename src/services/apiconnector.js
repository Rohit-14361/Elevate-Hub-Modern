import axios from "axios"

export const axiosInstance = axios.create({
    timeout: 300000, // 5 minutes timeout for large file uploads
});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}