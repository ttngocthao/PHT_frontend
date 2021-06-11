import * as actionTypes from '../../store/actionConstants';
import {DailyNoteAction, DailyNoteState, IDailyNote} from '../../types';

const initialState: DailyNoteState={
    dailyNotes:[],
    selectedDayNote: undefined,
    selectedDate: new Date(),
    selectedMealType: undefined,
    currentUser:'Mum',
    editMode:false
};

let mealType:string;
let selectedDayNote : IDailyNote;
let updatedAllNotes:IDailyNote[];

const reducer =(state:DailyNoteState = initialState,action: DailyNoteAction):DailyNoteState=>{
    switch(action.type){

        case actionTypes.INIT_DAILYNOTES: 
            // console.log('all dailyNote',action.payload);            
            return {...state,...action.payload};

        case actionTypes.GET_DAYNOTE:
            // console.log('get daynote',action.payload);
            return {...state,selectedDayNote: action.payload};

        case actionTypes.SELECT_DATE:
            return {...state,selectedDate:action.payload};

        case actionTypes.ADD_DAYNOTE:
            return {...state,dailyNotes: [...state.dailyNotes, action.payload],selectedDayNote:action.payload};

        case actionTypes.UPDATE_DAILYNOTE:
            updatedAllNotes = state.dailyNotes.map((item:IDailyNote)=> item.id=== action.payload.id ? action.payload : item);
            // console.log('update daily notes',updatedDailyNotes);
            return {...state,dailyNotes:updatedAllNotes,selectedDayNote:action.payload};

        case actionTypes.DELETE_DAILYNOTE:
            updatedAllNotes = state.dailyNotes.filter((item:IDailyNote)=>item.id !== action.payload.id );
            return {...state,dailyNotes:updatedAllNotes,selectedDayNote:undefined};

        case actionTypes.SELECT_MEALTYPE:
            return {...state, selectedMealType: action.payload};

        case actionTypes.ADD_MEALNOTE:
            const newAddedMeal = action.payload;
            mealType = newAddedMeal.mealType.toLowerCase();
            // console.log('mealType',mealType);
            selectedDayNote = {...state.selectedDayNote, [mealType]:newAddedMeal} as IDailyNote;
            // console.log('selectedDayNote',selectedDayNote);
            updatedAllNotes = state.dailyNotes.map((item:IDailyNote)=>item.date === selectedDayNote.date ? selectedDayNote : item);
            // console.log('updatedAllNotes',updatedAllNotes);
            return {...state,dailyNotes: updatedAllNotes,selectedDayNote:selectedDayNote};
        
        case actionTypes.TOGGLE_EDITMODE:
            return {...state,editMode:!state.editMode};

        case actionTypes.UPDATE_MEALNOTE:
            const updatedMealNote = action.payload;
            mealType = updatedMealNote.mealType.toLowerCase();
            selectedDayNote = {...state.selectedDayNote,[mealType]:updatedMealNote} as IDailyNote;
            updatedAllNotes = state.dailyNotes.map((item:IDailyNote)=>item.date === selectedDayNote.date ? selectedDayNote : item);
            return {...state,dailyNotes:updatedAllNotes,selectedDayNote:selectedDayNote};

        case actionTypes.DELETE_MEALNOTE:
            const deletedItem = action.payload;
            mealType = deletedItem.mealType.toLocaleLowerCase();
            selectedDayNote ={...state.selectedDayNote,[mealType]:undefined} as IDailyNote;
            updatedAllNotes = state.dailyNotes.map((item:IDailyNote)=>item.date === selectedDayNote.date ? selectedDayNote: item);
            return {...state,dailyNotes: updatedAllNotes,selectedDayNote: selectedDayNote};

        default:
            return state;
    }
};

export default reducer;
/**
 * ? 1. initialise state
 * ? 2. reducer function which receives previous state and action to update the store
 */