import axios from "axios";
const endpoint='http://localhost:8080';
const token= localStorage.getItem("token");
export function get(url){
    //console.log(token);
    return axios.get(endpoint + url,{
        headers: {Authorization: `Bearer ${token}`},
    });
}

export function put(url,body){
    return axios.put(endpoint + url, body,{
        headers: {Authorization: `Bearer ${token}`},
    });
}

export function post(url,body){
    return axios.post(endpoint + url,body,{
        headers: {Authorization: `Bearer ${token}`},
    });
}

export function del(url){
    return axios.delete(endpoint + url, {
        headers: {Authorization: `Bearer ${token}`},
    });
}