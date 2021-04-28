import React from 'react';
import {MealNoteProps} from '../../types';
interface Props{
    data: MealNoteProps
}

const MealNote = ({data}:Props) => {
    const {skippedMeal,menuDetails,bgBe4Meal,bgAftMeal,bpBe4Meal,bpAftMeal,note}=data;
    return (
        <div>
          <h3>{skippedMeal && 'Skipped'}</h3>
          {!skippedMeal && 
            <div>
              <div>
                    <h4>Meal includes:</h4> 
                    <hr/>
                    <p>{menuDetails}</p>
              </div>
              <div>
                    <h4> Blood glucose</h4> 
                    <hr/>
                    <div>
                        <p>Before meal: {bgBe4Meal} mg/dl</p>
                        <p>After meal: {bgAftMeal} mg/dl</p>
                    </div>
              </div>
              <div>
                    <h4> Blood pressure</h4> 
                    <hr/>
                    <div>
                        <p>Before meal: {bpBe4Meal} mm/Hg</p>
                        <p>After meal: {bpAftMeal} mm/Hg</p>
                    </div>
              </div>
                    <h4>Note: (regarding medication, feelings, food reaction, etc...)</h4>
                    <hr/>
                    <div>
                        {note}
                    </div>
            </div>}
          
        </div>
    );
};

export default MealNote;
