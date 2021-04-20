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


