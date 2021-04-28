//import React from 'react';
import React,{useState} from 'react';
import {EntryDailyNoteFormValue,MealType} from '../../types';
import { useDispatch, useSelector} from 'react-redux';
import {Button} from 'semantic-ui-react';
import { addDailyNote } from '../../state/actionCreators/dailyNote.actionCreators';
import { RootState } from '../../store';
import AddDailyNoteModal from '../addDailyNoteModal';
import AddMealNoteModal from '../addMealNoteModal';
import DailyNote from '../dailyNote';
import MealNote from '../mealNote';



const DateDetails = () => {
    const dispatch = useDispatch();
    const selectedDayNote = useSelector((state:RootState)=>state.dailyNotes.selectedDayNote);
    const [showForm,setShowForm]= useState(false);
    const [showMealForm,setShowMealForm] = useState(false);
    const onSubmitHandle =(values:EntryDailyNoteFormValue)=>{
        console.log('submit form',values);
       dispatch(addDailyNote(values));
       setShowForm(false);
    };
    const addMealHandle = ()=>{
        alert('added meal');
    };
    const showMealFormHandle =(dailyNoteId:string,mealType:MealType)=>{
        console.log(mealType,'-',dailyNoteId);
        setShowMealForm(true);
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
            {selectedDayNote.breakfast ? <MealNote data={selectedDayNote.breakfast} /> : <button onClick={()=>showMealFormHandle(selectedDayNote.id,MealType.Breakfast)}>Add Breakfast details</button> }
            <br/>
            <h3>Lunch</h3>
            {selectedDayNote.lunch ? <MealNote data={selectedDayNote.lunch} /> : <button onClick={()=>alert('add lunch details')}>Add Lunch details</button>}
            <br/>
            <h3>Dinner</h3>
            {selectedDayNote.dinner ? <MealNote data={selectedDayNote.dinner} /> :<button onClick={()=>alert('add dinner details')}>Add Dinner details</button>}
            <br/>
            <AddMealNoteModal 
                modalOpen={showMealForm} 
                onClose={()=>setShowMealForm(false)}
                onSubmit={addMealHandle}
            />
        </div>
    );
};

export default DateDetails;
