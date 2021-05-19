import React from 'react';
import {MealNoteProps} from '../../types';
interface Props{
    data: MealNoteProps
}

const MealNote = ({data}:Props) => {
    const {skippedMeal,menuDetails,note}=data;
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
              {/* <div>
                    <h4> Blood glucose</h4> 
                    <hr/>
                    <div>
                        <p>Before meal: {bgBe4Meal} mg/dl</p>
                        <p>After meal: {bgAftMeal} mg/dl</p>
                    </div>
              </div> */}
              {/* <div>
                    <h4> Blood pressure</h4> 
                    <hr/>
                    <div>
                        <p>Before meal: {bpBe4Meal} mm/Hg</p>
                        <p>After meal: {bpAftMeal} mm/Hg</p>
                    </div>
              </div> */}
              <div>
                  <p>Medication during the meal?</p>
                    [got medNote field]
              </div>
              <div>
                <h4>Note: (regarding feelings before and after meal, etc...)</h4>
                    <hr/>
                    <div>
                        {note}
                    </div>  
              </div>
                    
            </div>}
          
        </div>
    );
};

export default MealNote;
