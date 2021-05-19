import axios from 'axios';
import { EntryMealNoteFormValue,MealNoteEntry } from '../types';
const baseUrl ='http://localhost:5000/api/mealNotes';

const add = async(newMealNote:EntryMealNoteFormValue)=>{
    const res = await axios.post<MealNoteEntry>(`${baseUrl}`,newMealNote);
    return res.data;
};

export default{add};