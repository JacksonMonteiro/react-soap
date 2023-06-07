import axios from "axios";

const soapService = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/',
    headers: {
        "Content-Type": 'text/xml'
    }
});

export default soapService;