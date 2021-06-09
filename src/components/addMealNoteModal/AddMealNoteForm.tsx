import React from 'react';
import {format} from 'date-fns';
import { Formik,Form,Field } from 'formik';
import { CheckboxField, TextField } from '../formHelper';
import {Button} from 'semantic-ui-react';
import {EntryMealNoteFormValue,MealNoteEntry,MealType} from '../../types';
import {RootState} from '../../store';
import { useSelector } from 'react-redux';


interface Props {
  onSubmit: (values:EntryMealNoteFormValue)=>void
  editMode: boolean
}
const AddMealNoteForm = ({onSubmit,editMode}:Props) => {
    const {selectedDate,selectedMealType,selectedDayNote} = useSelector((state:RootState)=>({
      selectedDate: state.dailyNotes.selectedDate,
      selectedMealType: state.dailyNotes.selectedMealType,
      selectedDayNote: state.dailyNotes.selectedDayNote
      
      }));
    
 

    const convertMealTypeStringToEnum =(str:string|undefined):MealType=>{
      if(!str){
        return MealType.Breakfast;
      }
      let result:MealType;
      switch(str){
        case 'Lunch':
          result= MealType.Lunch;
          break;
        case 'Dinner':
          result = MealType.Dinner;
          break;
        default:
          result= MealType.Breakfast;
      }
      return result;
    };

    const validate=(values:EntryMealNoteFormValue)=>{
        const requiredError = "Field is required";
   
        const errors: { [field: string]: string } = {};
       if(!values.menuDetails){
         errors.menuDetails =requiredError;
       }
      
        return errors;
    };
//console.log('selectedMealType',selectedMealType,editMode);
const getCurrentMealNoteData =()=>{
 const mt = selectedMealType?.toLowerCase();
  let currentMealNoteData: MealNoteEntry | undefined;
  switch(mt){
    case 'breakfast':
      currentMealNoteData = selectedDayNote?.breakfast;
      break;
    case 'lunch':
      currentMealNoteData = selectedDayNote?.lunch;
      break;
    case 'dinner':
      currentMealNoteData = selectedDayNote?.dinner;
      break;
    default:
       currentMealNoteData = undefined;
    break;
  }
  console.log('current meal data',currentMealNoteData);
 return currentMealNoteData;
};

    return (
        <div>
          
           <Formik
            initialValues={{
                username:'mum',
                date:format(selectedDate, "ccc dd MMM yy"),//from store
                mealType: convertMealTypeStringToEnum(selectedMealType),//from store
                menuDetails:editMode ? getCurrentMealNoteData()?.menuDetails : '',
                skippedMeal:editMode ? getCurrentMealNoteData()?.skippedMeal :false
            }}
            validate={(values)=>validate(values)}
            onSubmit={onSubmit}
           >
               {({isValid,dirty})=> {
                return(
                    <Form className="form ui">
                          
                          <Field
                            label='Skipped this meal'
                            name='skippedMeal'
                            component={CheckboxField}
                          />
                         <Field
                            placeholder='Ex: 2eggs / black coffee during fasting'
                            name='menuDetails'
                            label='Meal includes / Fasting Liquids'
                            component={TextField}
                            multiLines={true}
                         />                         
                          <Button
                            type='submit'
                            floated='right'
                            color={'green'}
                            disabled={!dirty || !isValid}
                        >
                            Add
                        </Button>
                    </Form>
                    );
                }}
           </Formik>
        </div>
    );
};

export default AddMealNoteForm;
