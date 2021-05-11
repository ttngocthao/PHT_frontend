import * as actionTypes from '../../store/actionConstants';
import {DailyNoteAction, DailyNoteState} from '../../types';

const initialState: DailyNoteState={
    dailyNotes:[],
    selectedDayNote: undefined,
    selectedDate: new Date()
};



const reducer =(state:DailyNoteState = initialState,action: DailyNoteAction):DailyNoteState=>{
    switch(action.type){
        case actionTypes.INIT_DAILYNOTES: 
            console.log('all dailyNote',action.payload);            
            return {...state,...action.payload};
        case actionTypes.GET_DAYNOTE:
            console.log('get daynote',action.payload);
            return {...state,selectedDayNote: action.payload};
        case actionTypes.SELECT_DATE:
            return {...state,selectedDate:action.payload};
        case actionTypes.ADD_DAYNOTE:
            return {...state,dailyNotes: [...state.dailyNotes, action.payload],selectedDayNote:action.payload};
        default:
            return state;
    }
};

export default reducer;
/**
 * ? 1. initialise state
 * ? 2. reducer function which receives previous state and action to update the store
 */