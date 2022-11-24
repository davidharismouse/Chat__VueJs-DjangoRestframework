import axios from "axios"

const httproot = "http://127.0.0.1:8500/api"

const headers = {
    Authorization:`Token ${localStorage.getItem("chat_userid")}`
}

export async function login(params) {
    try {
        const certification = await axios.post(
            `${httproot}/login/`, params
        );
        console.log("certi=", certification.data);
        localStorage.setItem("chat_username", certification.data.user.username);
        localStorage.setItem("caht_userid", certification.data.user.id);
        localStorage.setItem("chat_Token", certification.data.token);
        return {
            status: 200
        };
    } catch (error) {
        return getErrorCode(error);
    }
}

export async function getUserList() {
    console.log("userparam")
    try {
        const result = await axios.get(
            `${httproot}/users`
        );
        return result.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function sendMessage(params) {
    
    try {
        await axios.post(
            `${httproot}/msg/`, params, {headers: headers }
        );
        return {
            message: "Success",
            status: 200
        };
    } catch (err) {
        console.log(err);
    }
}

export async function getMessageList(params) {
    console.log("params==>", params);
    try {
        const result = await axios.get(
            `${httproot}/messagelist/`, {params: params, headers: headers} 
        );
        return result.data
    } catch(err) {
        console.log(err);
    }
}

function getErrorCode(error) {
    if (error.response.status === 404){
        return {
            message: [error?.response?.data?.error],
            status: 404
        }
    } else if(error.response.status === 400) {
        return {
            message: error?.response?.data?.error,
            status: 400
        }
    } else {
        return {
            message: error?.message,
            status: error.response.status
        }
    }
}