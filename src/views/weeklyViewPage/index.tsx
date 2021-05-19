import React from 'react';

import Calendar from '../../components/calendar';
import DateDetails from '../../components/dateDetails';
//import { RootState } from '../../store';

const WeeklyViewPage = () => {
    // const dispatch = useDispatch();
    
    // const allDailyNotes = useSelector((state:RootState):IDailyNote[]|[]=>state.dailyNotes.dailyNotes);
    // const dayData = useSelector((state:RootState)=>state.dailyNotes.selectedDayNote);
   
    return (
        <div>
            
           
            <Calendar/>
            <DateDetails/>
        </div>
    );
};

export default WeeklyViewPage;
