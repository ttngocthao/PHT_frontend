import * as actionTypes from '../../store/actionConstants';
import dailyNoteService from '../../services/dailyNotes';
import mealNotesService from '../../services/mealNotes';
import {DispatchType,DailyNoteAction,IDailyNote,EntryDailyNoteFormValue,EntryMealNoteFormValue} from '../../types';
import { format } from 'date-fns';


export const getDailyNotes =()=>{   
   return async (dispatch: DispatchType)=>{
       const dailyNotes = await dailyNoteService.getAll();
       const action: DailyNoteAction ={
        type: actionTypes.GET_DAILYNOTES,
        payload: dailyNotes
     };
      dispatch(action);
    };
};


export const initDailyNotes =()=>{   
   return async (dispatch: DispatchType)=>{
       const dailyNotes = await dailyNoteService.getAll();
       const todayStr = format(new Date(),"ccc dd MMM yy");
       const todayNote = dailyNotes.find(item=>item.date === todayStr);
       const action: DailyNoteAction ={
        type: actionTypes.INIT_DAILYNOTES,
        payload: {
          dailyNotes,         
          selectedDayNote: todayNote,
          }
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


export const addDailyNote =(dailyNote: EntryDailyNoteFormValue)=>{
  
  return async (dispatch:DispatchType)=>{  
    
    const newDailyNote = await dailyNoteService.add(dailyNote);
  
    const action: DailyNoteAction ={
      type: actionTypes.ADD_DAYNOTE,
      payload: newDailyNote
    };
    return dispatch(action);
  };
};

export const updateDailyNote = (noteId:string,dailyNoteValue:EntryDailyNoteFormValue)=>{  

  return async (dispatch:DispatchType)=>{
    try {
      const updatedDailyNote = await dailyNoteService.update(noteId,dailyNoteValue);

      const action: DailyNoteAction ={
        type: actionTypes.UPDATE_DAILYNOTE,
        payload: updatedDailyNote
      };
  
      return dispatch(action);
    } catch (error) {
      console.log(error);
    }
   
  };
};

export const setSelectedDate =(selectedDate:Date)=>{
  return (dispatch:DispatchType)=>{
    const action: DailyNoteAction ={
      type: actionTypes.SELECT_DATE,
      payload:selectedDate
    };
    return dispatch(action);
  };
};

export const setSelectedMealType =(selectedMealType:string)=>{

    return(dispatch:DispatchType)=>{

        const action: DailyNoteAction ={
            type:actionTypes.SELECT_MEALTYPE,
            payload: selectedMealType
        };

        return dispatch(action);
    };
};

export const addMealNote = (newMealNote: EntryMealNoteFormValue )=>{

    return async (dispatch:DispatchType)=>{

      try {

        const mealNote = await mealNotesService.add(newMealNote);

        const action: DailyNoteAction ={
            type: actionTypes.ADD_MEALNOTE,
            payload: mealNote
        };

        return dispatch(action);

      } catch (error) {
        console.log(error);
      }
        
    };
};

export const toggleEditMode = ()=>{
  return (dispatch:DispatchType)=>{
    const action: DailyNoteAction={
      type: actionTypes.TOGGLE_EDITMODE
    };
    return dispatch(action);
  };
};


export const updateMealNote =(mealNoteId:string,mealNoteValue:EntryMealNoteFormValue)=>{
  try {
    return async (dispatch:DispatchType)=>{
      const updatedMealNote = await mealNotesService.update(mealNoteId,mealNoteValue);
  
      const action: DailyNoteAction={
        type: actionTypes.UPDATE_MEALNOTE,
        payload: updatedMealNote
      };
      return dispatch(action);
    };
  } catch (error) {
    console.log(error);
  }
  
};