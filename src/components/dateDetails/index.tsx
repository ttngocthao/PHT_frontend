//import React from 'react';
import React,{useState} from 'react';
import {EntryDailyNoteFormValue, EntryMealNoteFormValue} from '../../types';
import { useDispatch, useSelector} from 'react-redux';
import {Button} from 'semantic-ui-react';
import { addDailyNote,setSelectedMealType,addMealNote } from '../../state/actionCreators/dailyNote.actionCreators';
import { RootState } from '../../store';
import AddDailyNoteModal from '../addDailyNoteModal';
import AddMealNoteModal from '../addMealNoteModal';
import DailyNote from '../dailyNote';
import MealNote from '../mealNote';

//import { addMealNote,  } from '../../state/actionCreators/mealNote.actionCreators';



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

    const addMealHandle = (values: EntryMealNoteFormValue)=>{
       if(values){
           dispatch(addMealNote(values));//! add data to database - update view
           setShowMealForm(false);//! close the form
       }else{
           alert('failed to add as values are empty');
       }       
    };

    const showMealFormHandle =(dailyNoteId:string,mealType:string)=>{
        //console.log(mealType,'-',dailyNoteId);
        dispatch(setSelectedMealType(mealType));
        setShowMealForm(true);
    };

    if(!selectedDayNote){
        return <div>Not taken note yet
            <br/>
            <br/>
            {/* <button onClick={()=>setShowForm(true)}>Add Daily Note Details</button> */}
            <Button onClick={()=>setShowForm(true)} className='ui button' color='teal'>Add Daily Note Details</Button>
            <AddDailyNoteModal 
                modalOpen={showForm} 
                onClose={()=>setShowForm(false)}
                onSubmit={onSubmitHandle}
            />
           
        </div>;
    }
    const {fastingHours,sleepingHours,date,note,medication,bloodGlucose,bloodPressure,activities,beverages}=selectedDayNote;

    const fastingProtocol = ():string=>{
        let countMeals = 0;
        let protocol ='';
        if(selectedDayNote.breakfast?.skippedMeal){
            countMeals++ ;
        }
        if(selectedDayNote.lunch?.skippedMeal){
            countMeals++ ;
        }
        if(selectedDayNote.dinner?.skippedMeal){
            countMeals++ ;
        }
       
        switch(countMeals){
            case 0:
                protocol = '3Mad';
                break;
            case 1:
                protocol = '2Mad';
                break;
            case 2: 
                protocol= 'OMad';
                break;
            case 3:
                protocol='NoMad';
                break;
            default:
                protocol = '3Mad';
                break;
        }
        return protocol;
    };
    return (
        <div>          
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
            />
            
            <h3>Breakfast</h3>
            {selectedDayNote.breakfast ? 
                <MealNote data={selectedDayNote.breakfast} /> : 
                <Button className='ui button' color='teal' onClick={()=>showMealFormHandle(selectedDayNote.id,'Breakfast')}>
                    Add Breakfast details
                </Button> 
                }
            <br/>
            <h3>Lunch</h3>
            {selectedDayNote.lunch ? 
                <MealNote data={selectedDayNote.lunch} /> : 
                <Button className='ui button' color='teal' onClick={()=>showMealFormHandle(selectedDayNote.id,'Lunch')}>
                    Add Lunch details
                </Button>
            }
            <br/>
            <h3>Dinner</h3>
            {selectedDayNote.dinner ? 
                <MealNote data={selectedDayNote.dinner} /> :
                <Button className='ui button' color='teal' onClick={()=>showMealFormHandle(selectedDayNote.id,'Dinner')}>
                    Add Dinner details
                </Button>
            }
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
