import axios from 'axios';
import config from "./config";
export default axios.create({
    baseURL : config.rootPath,
    withCredentials: true 
});
//tạo axios với baseUrl từ file config nhé. cho tiện lỡ sau đường dẫn kp là 6969 mà là heroku