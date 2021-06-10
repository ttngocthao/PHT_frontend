import React from 'react';
import SettingBtns from './SettingBtns';
import MealNote from './index';
import { Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
  mealType: string
  editMealMode:boolean
  editMealHandle: (mealType:string)=>void
  deleteMealHandle: (mealType:string)=>void
  showMealFormHandle: (selectedDayNoteId:string,mealType:string)=>void
}

const MealDetailsSection = ({mealType,editMealMode,editMealHandle,showMealFormHandle,deleteMealHandle}:Props) => {
  const selectedDayNote = useSelector((state:RootState)=>state.dailyNotes.selectedDayNote);
  const editMode = useSelector((state:RootState)=>state.dailyNotes.editMode);
  const getMealNoteData =()=>{
    if(!selectedDayNote){
      return null;
    }
    let data;
    switch(mealType){
      case 'Breakfast':
        data = selectedDayNote.breakfast;
        break;
      case 'Lunch':
        data = selectedDayNote.lunch;
        break;
      case 'Dinner':
        data = selectedDayNote.dinner;
        break;
      default:
        data= selectedDayNote.breakfast;
        break;
    }
    return data;
  };
  if(!selectedDayNote){
    return null;
  }
  const data = getMealNoteData();
  return (
    <div>
       <h3>{mealType}</h3>
       
      {data ? (
        <>
          {editMode && (
            <SettingBtns
              mealType={mealType}
              editMealMode={editMealMode}
              editMealHandle={()=>editMealHandle(mealType)}
              deleteMealHandle={deleteMealHandle}
            />
          )}
          <MealNote data={data} />
        </>
      ) : (
        <Button
          className="ui button"
          color="teal"
          onClick={() => showMealFormHandle(selectedDayNote.id, mealType)}
        >
          Add {mealType} details
        </Button>
      )}
      <br/>
    </div>
  );
};

export default MealDetailsSection;
