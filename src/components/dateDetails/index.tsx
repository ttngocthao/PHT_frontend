//import React from 'react';
import React, { useState } from "react";
import { EntryDailyNoteFormValue, EntryMealNoteFormValue } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import {
  addDailyNote,
  setSelectedMealType,
  addMealNote,
  updateDailyNote,
  toggleEditMode,
  updateMealNote,
  deleteDailyNote,
  deleteMealNote as deleteMealById
} from "../../state/actionCreators/dailyNote.actionCreators";
import { RootState } from "../../store";
import AddDailyNoteModal from "../addDailyNoteModal";
import AddMealNoteModal from "../addMealNoteModal";
import DailyNote from "../dailyNote";
import ConfirmModal from '../confirmModal';
// import MealNote from "../mealNote";
// import SettingBtns from "../mealNote/SettingBtns";
import MealDetailsSection from "../mealNote/MealDetailsSection";

//import { addMealNote,  } from '../../state/actionCreators/mealNote.actionCreators';

const DateDetails = () => {
  const dispatch = useDispatch();
  const selectedDayNote = useSelector(
    (state: RootState) => state.dailyNotes.selectedDayNote
  );
  const selectedDate = useSelector((state:RootState)=>state.dailyNotes.selectedDate);
  const editMode = useSelector((state: RootState) => state.dailyNotes.editMode);
  const [showForm, setShowForm] = useState(false);//for daily form
  const [showMealForm, setShowMealForm] = useState(false);
  const [showConfirm,setShowConfirm]=useState({
    confirmOpened:false,
    confirmContent: '',
    confirmHeader: '',
    type:''
    });
 
  // const [editMode,setEditMode]= useState(false);

  const onSubmitDayFormHandle = (values: EntryDailyNoteFormValue) => {
    if (!values) {
      throw new Error(" failed to save as values are empty");
      return;
    }
    if (!editMode) {
      console.log("submit new note", values);
      dispatch(addDailyNote(values));
    }
    if (selectedDayNote && editMode) {
      dispatch(updateDailyNote(selectedDayNote?.id, values));
    }

    console.log("finished editing", values);
    setShowForm(false);
    // setEditMode(false);
  };

  const addMealHandle = (values: EntryMealNoteFormValue) => {
    if (!values) {
      throw new Error(" failed to save as values are empty");
      return;
    }
    if (!editMode) {
      dispatch(addMealNote(values)); //! add data to database - update view
      
    }
    if (selectedDate && editMode) {
      const mealType = values.mealType.toLowerCase();
      let mealNoteId:string|undefined;
      switch(mealType){
        case 'breakfast':
          mealNoteId = selectedDayNote?.breakfast?.id;
          break;
        case 'lunch':
          mealNoteId= selectedDayNote?.lunch?.id;
          break;
        case 'dinner':
          mealNoteId = selectedDayNote?.dinner?.id;
          break;
        default:
          mealNoteId=undefined;
      }
      
      if(mealNoteId && values){
        dispatch(updateMealNote(mealNoteId,values));
        // console.log('mealNoteId',mealNoteId);
        // console.log('updated meal note',values);
      }
      
     
    }

    setShowMealForm(false); //! close the form
  };

  const showMealFormHandle = (dailyNoteId: string, mealType: string) => {
    //console.log(mealType,'-',dailyNoteId);
    dispatch(setSelectedMealType(mealType));
    setShowMealForm(true);
  };

  if (!selectedDayNote) {
    return (
      <div>
        Not taken note yet
        <br />
        <br />
        {/* <button onClick={()=>setShowForm(true)}>Add Daily Note Details</button> */}
        <Button
          onClick={() => setShowForm(true)}
          className="ui button"
          color="teal"
        >
          Add Daily Note Details
        </Button>
        <AddDailyNoteModal
          modalOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={onSubmitDayFormHandle}
        />
      </div>
    );
  }
  const {
    fastingHours,
    sleepingHours,
    date,
    note,
    medication,
    bloodGlucose,
    bloodPressure,
    activities,
    beverages,
  } = selectedDayNote;

  const fastingProtocol = (): string => {
    let countMeals = 0;
    let protocol = "";
    if (!selectedDayNote.breakfast || selectedDayNote.breakfast===null) {
      countMeals++;
    }
     if(!selectedDayNote.lunch || selectedDayNote.lunch===null){
      countMeals++;
    }
    if(!selectedDayNote.dinner || selectedDayNote.dinner===null){
      countMeals++;
    }
    if(selectedDayNote.breakfast && selectedDayNote.breakfast.skippedMeal){
      countMeals++;
    }
    if ( selectedDayNote.lunch && selectedDayNote.lunch.skippedMeal) {
      countMeals++;
    }
    if ( selectedDayNote.dinner && selectedDayNote.dinner.skippedMeal) {
      countMeals++;
    }
   
    switch (countMeals) {
      case 0:
        protocol = "3Mad";        
        break;
      case 1:
        protocol = "2Mad";
        break;
      case 2:
        protocol = "OMad";
        break;
      case 3:
        protocol = "NoMad";
        break;
      default:
        protocol = "3Mad";
        break;
    }
    console.log('countMeals',countMeals);
    return protocol;
  };

  const editDayNoteHandle = () => {
    setShowForm(true);
    
    if (!editMode) {
      dispatch(toggleEditMode());
    }
  };

  const editHandle = () => {
    dispatch(toggleEditMode());
  };

  const editMealHandle = (mealType:string) => {
    setShowMealForm(true);
    showMealFormHandle(selectedDayNote.id, mealType);
  };

  
  const deleteDailyNoteConfirm =()=>{
   setShowConfirm(
          { confirmOpened:true,
           confirmHeader:'Delete Daily Note?',
           type:'dailyNote',
           confirmContent:'This action cannot be undone. Are you sure that you want to delete it?'});
  
  };
  const deleteMealNote =(mealType:string)=>{
    setShowConfirm ({
      confirmOpened:true,
      confirmHeader: `Delete ${mealType} details?`,
      type:mealType,
      confirmContent:'This action cannot be undone. Are you sure that you want to delete it?'   
      });
  };

  const handleConfirm =()=>{
    switch(showConfirm.type.toLowerCase()){
      case 'dailynote':
        // alert('delete this date note');
        //dispatch delete daily note here
        dispatch(deleteDailyNote(selectedDayNote.id));
        break;
      case 'breakfast':
         //dispatch delete breakfast
        if(selectedDayNote.breakfast){
          dispatch(deleteMealById(selectedDayNote.breakfast.id));
        }else{
          alert('Could not find the breakfast id');
          console.log('selectedDayNote',selectedDayNote);
        }
       
        break;
      case 'lunch': 
        //dispatch delete lunch
        if(selectedDayNote.lunch){
          dispatch(deleteMealById(selectedDayNote.lunch.id));
        }else{
          alert('Could not find the lunch id');
          console.log('selectedDayNote',selectedDayNote);
        }     
         
        break;
      case 'dinner':
        //dispatch delete dinner
        if(selectedDayNote.dinner){
          dispatch(deleteMealById(selectedDayNote.dinner.id));
        }else{
          alert('Could not find the dinner id');
          console.log('selectedDayNote',selectedDayNote);
        }
        break;
      default:
        break;
    }

    setShowConfirm({
      confirmOpened:false,
      confirmContent:'',
      confirmHeader:'',
      type:''
    });
  };



  return (
    <div>
      {/* <Button color='orange' onClick={editDayNoteHandle}>{editMode ? 'Finish Editing' : 'Edit General Details'}</Button>    */}
      <Button
        circular
        color={editMode ? "teal" : "orange"}
        size="big"
        icon={editMode ? "save outline" : "edit outline"}
        onClick={editHandle}
      />
      <Button
        circular
        color="grey"
        size="big"
        icon="trash alternate outline"
        onClick={deleteDailyNoteConfirm}
      />
    
      <DailyNote
        fastingHours={fastingHours}
        sleepingHours={sleepingHours}
        date={date}
        note={note}
        fastingProtocol={fastingProtocol()}
        medication={medication}
        bloodPressure={bloodPressure}
        bloodGlucose={bloodGlucose}
        activities={activities}
        beverages={beverages}
        editDayNoteHandle={editDayNoteHandle}
        editMode={editMode}
      />


      {['Breakfast','Lunch','Dinner'].map((item,index)=>{
        return (
          <div key={index}>
              <MealDetailsSection           
                mealType={item}
                editMealHandle={editMealHandle}
                showMealFormHandle={showMealFormHandle}
                deleteMealHandle={deleteMealNote}
                editMealMode={false}
                // showConfirm={showConfirm.confirmOpened}
              />
          </div>
        
        );
      })}
      
      <br />
      <AddMealNoteModal
        modalOpen={showMealForm}
        onClose={() => setShowMealForm(false)}
        onSubmit={addMealHandle}
        editMode={editMode}
      />
      <AddDailyNoteModal
        modalOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={onSubmitDayFormHandle}
        editMode={editMode}
      />
      {showConfirm.confirmOpened ? 
        <ConfirmModal
           confirmOpened={showConfirm.confirmOpened}
           confirmHeader={showConfirm.confirmHeader}
           confirmContent={showConfirm.confirmContent}
           handleConfirm={handleConfirm}
           handleCancel={()=>setShowConfirm({confirmOpened:false,confirmContent:'',confirmHeader:'',type:''})}
        /> 
      : null}
    </div>
  );
};

export default DateDetails;
