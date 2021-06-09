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
} from "../../state/actionCreators/dailyNote.actionCreators";
import { RootState } from "../../store";
import AddDailyNoteModal from "../addDailyNoteModal";
import AddMealNoteModal from "../addMealNoteModal";
import DailyNote from "../dailyNote";
import MealNote from "../mealNote";
import SettingBtns from "../mealNote/SettingBtns";

//import { addMealNote,  } from '../../state/actionCreators/mealNote.actionCreators';

const DateDetails = () => {
  const dispatch = useDispatch();
  const selectedDayNote = useSelector(
    (state: RootState) => state.dailyNotes.selectedDayNote
  );
  const editMode = useSelector((state: RootState) => state.dailyNotes.editMode);
  const [showForm, setShowForm] = useState(false);
  const [showMealForm, setShowMealForm] = useState(false);
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
      dispatch(updateMealNote(values));
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
    if (selectedDayNote.breakfast?.skippedMeal) {
      countMeals++;
    }
    if (selectedDayNote.lunch?.skippedMeal) {
      countMeals++;
    }
    if (selectedDayNote.dinner?.skippedMeal) {
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
    return protocol;
  };

  const editDayNoteHandle = () => {
    setShowForm(true);
    // setEditMode(true);
    if (!editMode) {
      dispatch(toggleEditMode());
    }
  };

  const editHandle = () => {
    // if(!editMode){
    //     setEditMode(true);
    // }else{
    //     setEditMode(false);
    // }
    dispatch(toggleEditMode());
  };

  // const closeEditing =()=>{
  //     setShowForm(false);
  //     // setEditMode(false);
  // };

  const editMealHandle = () => {
    setShowMealForm(true);
    showMealFormHandle(selectedDayNote.id, "Breakfast");
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
        onClick={() => alert("show confirm window")}
      />
      {/* <Icon name='edit outline' size='large'/>
            </Button> */}
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

      <h3>Breakfast</h3>
      {selectedDayNote.breakfast ? (
        <>
          {editMode && (
            <SettingBtns
              mealType="Breakfast"
              editMealMode={false}
              editMealHandle={editMealHandle}
            />
          )}
          {/* <Button color='orange' onClick={()=>alert('edit meal note')}>
                        {editMode ? 'Finish Editing' : 'Edit Breakfast Details'}
                    </Button> */}
          <MealNote data={selectedDayNote.breakfast} />
        </>
      ) : (
        <Button
          className="ui button"
          color="teal"
          onClick={() => showMealFormHandle(selectedDayNote.id, "Breakfast")}
        >
          Add Breakfast details
        </Button>
      )}
      <br />
      <h3>Lunch</h3>
      {selectedDayNote.lunch ? (
        <MealNote data={selectedDayNote.lunch} />
      ) : (
        <Button
          className="ui button"
          color="teal"
          onClick={() => showMealFormHandle(selectedDayNote.id, "Lunch")}
        >
          Add Lunch details
        </Button>
      )}
      <br />
      <h3>Dinner</h3>
      {selectedDayNote.dinner ? (
        <MealNote data={selectedDayNote.dinner} />
      ) : (
        <Button
          className="ui button"
          color="teal"
          onClick={() => showMealFormHandle(selectedDayNote.id, "Dinner")}
        >
          Add Dinner details
        </Button>
      )}
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
    </div>
  );
};

export default DateDetails;
