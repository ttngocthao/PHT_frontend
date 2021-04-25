//import React from 'react';
import React,{useState} from 'react';
//import {  useSelector} from 'react-redux';
import { useDispatch, useSelector} from 'react-redux';
import {Button} from 'semantic-ui-react';
import { addDailyNote } from '../../state/actionCreators/dailyNote.actionCreators';
import { RootState } from '../../store';
import AddDailyNoteModal from '../addDailyNoteModal';
import DailyNote from '../dailyNote';
import MealNote from '../mealNote';



const DateDetails = () => {
    const dispatch = useDispatch();
    const selectedDayNote = useSelector((state:RootState)=>state.dailyNotes.selectedDayNote);
    const [showForm,setShowForm]= useState(false);
    const onSubmitHandle =(values:EntryDailyNoteFormValue)=>{
        console.log('submit form',values);
       dispatch(addDailyNote(values));
    };
    if(!selectedDayNote){
        return <div>Not taken note yet
            <br/>
            <br/>
            {/* <button onClick={()=>setShowForm(true)}>Add Daily Note Details</button> */}
            <Button onClick={()=>setShowForm(true)} className='ui button' color='green'>Add Daily Note Details</Button>
            <AddDailyNoteModal 
                modalOpen={showForm} 
                onClose={()=>setShowForm(false)}
                onSubmit={onSubmitHandle}
            />
           
        </div>;
    }
    const {fastingHours,sleepingHours,date,note}=selectedDayNote;
    // const {fastingHours,sleepingHours,date,note} = state;
    return (
        <div>
           Display daily note and meal notes:
            <DailyNote 
                fastingHours={fastingHours} 
                sleepingHours={sleepingHours} 
                date={date} 
                note={note}/>
            <h3>Breakfast</h3>
            {selectedDayNote.breakfast ? <MealNote data={selectedDayNote.breakfast} /> : <button onClick={()=>alert(`add breakfast details for date with id: ${selectedDayNote.id}`)}>Add Breakfast details</button> }
            <br/>
            <h3>Lunch</h3>
            {selectedDayNote.lunch ? <MealNote data={selectedDayNote.lunch} /> : <button onClick={()=>alert('add lunch details')}>Add Lunch details</button>}
            <br/>
            <h3>Dinner</h3>
            {selectedDayNote.dinner ? <MealNote data={selectedDayNote.dinner} /> :<button onClick={()=>alert('add dinner details')}>Add Dinner details</button>}
            <br/>
            
        </div>
    );
};

export default DateDetails;
