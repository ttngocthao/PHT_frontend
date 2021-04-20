/**
 * ? 1. initialise state
 * ? 2. reducer function which receives previous state and action to update the store
 */


import * as actionTypes from './actionTypes';

const initialState: DailyNoteState={
    dailyNotes:[]
};

const reducer =(state:DailyNoteState = initialState,action: DailyNoteAction):DailyNoteState=>{
    switch(action.type){
        case actionTypes.INIT_DAILYNOTES:
            console.log('from reducer file',action.type,action.payload);
            return {...state,dailyNotes: action.payload};
        default:
            return state;
    }
};

export default reducer;