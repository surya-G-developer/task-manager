const HEADERS = { 'Content-Type': 'application/json' };
import { toast } from 'react-toastify';

export const apiRequest = async ( url, method, body = undefined,token = false,) => {
    const resolveResp = {};
    const options = {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };
    options.method = method;
    try {
        if (method !== 'GET' && method !== 'HEAD' && typeof body !== 'undefined')
            options.body = JSON.stringify(body);
        if (token) {
            const additionalHeader = {};
            if (token) additionalHeader.Authorization = `bearer ${token}`;
            options.headers = { ...HEADERS, ...additionalHeader };
        } else options.headers = HEADERS;
        console.log(process.env.API_HOST + url, "url")
        const response = await fetch( url, options);
        if (response.status === 200 ||  response.status === 201) {
            resolveResp.status = 'success';
            resolveResp.data = await response.json();
        } else {
              if (response.status >= 400 && response.status < 500) {
                resolveResp.status = 'failed';
                resolveResp.msg = 'Something went wrong. Please enter valid data .';
            } else if (response.status >= 500) {
                resolveResp.status = 'failed';
                resolveResp.msg = 'Internal Server Error Occurred. Please try again later.';
            }
            toast.error(resolveResp.msg, { hideProgressBar: false, closeOnClick: true });
        }
    } catch (error) { console.error(error); }
    return resolveResp;
}