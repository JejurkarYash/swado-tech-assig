import axios from "axios";


export const useStudent = async () => {
    const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/students`);
    return result.data;

}