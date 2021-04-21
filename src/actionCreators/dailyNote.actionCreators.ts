import * as actionTypes from '../store/actionConstants';
import dailyNoteService from '../services/dailyNotes';


export const getDailyNotes =()=>{   
   return async (dispatch: DispatchType)=>{
       const dailyNotes = await dailyNoteService.getAll();
       const action: DailyNoteAction ={
        type: actionTypes.INIT_DAILYNOTES,
        payload: dailyNotes
     };
      dispatch(action);
    };
};


export const getDayNote = (selectedDate:string,allNotes:IDailyNote[])=>{  
  return (dispatch:DispatchType)=>{
    const data = allNotes.find(item=>item.date === selectedDate);
    const action: DailyNoteAction ={
        type: actionTypes.GET_DAYNOTE,
        payload: data
    };
    dispatch(action);
  };
};

