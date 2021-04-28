import * as actionTypes from '../../store/actionConstants';
import dailyNoteService from '../../services/dailyNotes';
import {DispatchType,DailyNoteAction,IDailyNote,EntryDailyNoteFormValue} from '../../types';
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
  console.log('inside add dailynote func');
  return async (dispatch:DispatchType)=>{  
    console.log('inside dispatch func',dailyNote);
    const newDailyNote = await dailyNoteService.add(dailyNote);
    console.log(newDailyNote);
    const action: DailyNoteAction ={
      type: actionTypes.ADD_DAYNOTE,
      payload: newDailyNote
    };
    return dispatch(action);
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