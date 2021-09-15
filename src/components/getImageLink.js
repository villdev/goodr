import { axiosInstance } from ".";

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME
const CLOUD_URL = process.env.REACT_APP_CLOUDIN
const PRESET = process.env.REACT_APP_PRESET

export const getImageLink = async(image) => {
    try {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", PRESET);
        data.append("cloud_name", CLOUD_NAME);
        const response = await axiosInstance.post(CLOUD_URL, data);
        return response.data.secure_url
    } catch(err) {
        console.log(err)
    } 
}