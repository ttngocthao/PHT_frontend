import React from 'react';
import {MealNoteProps} from '../../types';
interface Props{
    data: MealNoteProps
}

const MealNote = ({data}:Props) => {
    const {skippedMeal,menuDetails}=data;
    return (
        <div>
            <h4>{skippedMeal && 'Skipped  - '}{!skippedMeal ? 'Meal includes' :'Fasting liquids'}:</h4>             
            <p style={{whiteSpace:'break-spaces'}}>{menuDetails}</p>
        </div>  
         
    );
};

export default MealNote;
