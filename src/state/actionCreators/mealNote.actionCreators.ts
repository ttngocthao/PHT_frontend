import * as actionTypes from '../../store/actionConstants';
import {DispatchType, MealNoteAction} from '../../types';


export const setSelectedMealType =(selectedMealType:string)=>{
    return(dispatch:DispatchType)=>{

        const action: MealNoteAction ={
            type:actionTypes.SELECT_MEALTYPE,
            payload: selectedMealType
        };

        return dispatch(action);
    };
};