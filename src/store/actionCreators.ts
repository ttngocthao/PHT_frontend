import axios from 'axios';
import * as actionTypes from './actionTypes';
const baseUrl ='http://localhost:5000/api';

const getAll = async()=>{
    const res = await axios.get<IDailyNote[]>(`${baseUrl}/dailyNotes`);
    return res.data;
};

export const getDailyNotes =()=>{   
   return async (dispatch: DispatchType)=>{
       const dailyNotes = await getAll();
       const action: DailyNoteAction ={
        type: actionTypes.INIT_DAILYNOTES,
        payload: dailyNotes
     };
      dispatch(action);
    };
};


