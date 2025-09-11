import axios from "axios"

export const useCourses = async () => {

    const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/courses`);
    return result.data;


}