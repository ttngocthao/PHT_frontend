import axios from 'axios';
import {IDailyNote,EntryDailyNoteFormValue} from '../types';
const baseUrl ='http://localhost:5000/api/dailyNotes';

const getAll = async()=>{
    const res = await axios.get<IDailyNote[]>(`${baseUrl}`);
    return res.data;
};

const add = async(newDailyNote:EntryDailyNoteFormValue)=>{
    const res = await axios.post<IDailyNote>(`${baseUrl}`,newDailyNote);
    return res.data;
};

const update = async(dailyNoteId:string,dailyNoteValue: Partial<EntryDailyNoteFormValue>)=>{      
    const res = await axios.post<IDailyNote>(`${baseUrl}/${dailyNoteId}`,dailyNoteValue);
    return res.data;
};

export default{getAll,add,update};