import axios from "axios";

const instance = axios.create({
    baseURL: 'https://emtlab2-backend.herokuapp.com/',
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
})

export default instance;