import React from 'react';
import { useSelector} from 'react-redux';
import { RootState } from '../../store';
import DailyNote from '../dailyNote';


const DateDetails = () => {
    const selectedDayNote = useSelector((state:RootState)=>state.dailyNotes.selectedDayNote);
    if(!selectedDayNote){
        return <div>Not taken note yet</div>;
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
            
        </div>
    );
};

export default DateDetails;
