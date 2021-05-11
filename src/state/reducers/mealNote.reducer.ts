import * as actionTypes from '../../store/actionConstants';
import {MealNoteState,MealNoteAction} from '../../types';

const initialState:MealNoteState ={
    selectedMealType:undefined
};

const reducer = (state=initialState,action:MealNoteAction)=>{

    switch(action.type){
        case actionTypes.SELECT_MEALTYPE:
            return {...state, selectedMealType: action.payload};
        default:
            return state;
    }
};

export default reducer;