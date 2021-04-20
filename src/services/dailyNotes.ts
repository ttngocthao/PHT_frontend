import axios from 'axios';
const baseUrl ='http://localhost:5000/api/dailyNotes';

const getAll = async()=>{
    const res = await axios.get<IDailyNote[]>(`${baseUrl}`);
    return res.data;
};


export default{getAll};