import React from 'react';

const MealNote = ({mealType,skippedMeal,menuDetails,bgBe4Meal,bgAftMeal,bpBe4Meal,bpAftMeal,note}:MealNoteProps) => {
    return (
        <div>
          <h3>{mealType} - {skippedMeal && 'Skipped'}</h3>
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
