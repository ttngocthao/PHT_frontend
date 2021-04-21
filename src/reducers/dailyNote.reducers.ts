import * as actionTypes from '../store/actionConstants';

const initialState: DailyNoteState={
    dailyNotes:[],
    selectedDayNote: undefined
};



const reducer =(state:DailyNoteState = initialState,action: DailyNoteAction):DailyNoteState=>{
    switch(action.type){
        case actionTypes.INIT_DAILYNOTES: 
            console.log('all dailyNote',action.payload);            
            return {...state,dailyNotes: action.payload};
        case actionTypes.GET_DAYNOTE:
            console.log('get daynote',action.payload);
            return {...state,selectedDayNote: action.payload};
        default:
            return state;
    }
};

export default reducer;
/**
 * ? 1. initialise state
 * ? 2. reducer function which receives previous state and action to update the store
 */