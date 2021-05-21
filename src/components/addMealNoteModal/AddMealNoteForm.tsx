import React from 'react';
import {format} from 'date-fns';
import { Formik,Form,Field } from 'formik';
import { CheckboxField, TextField } from '../formHelper';
import {Button} from 'semantic-ui-react';
import {EntryMealNoteFormValue, MealType} from '../../types';
import {RootState} from '../../store';
import { useSelector } from 'react-redux';

// const mealTypeOptions:MealTypeOption[]=[
//     {value: MealType.Breakfast,label:'Breakfast'},
//     {value: MealType.Lunch,label:'Lunch'},
//     {value: MealType.Dinner,label:'Dinner'},
// ];
interface Props {
  onSubmit: (values:EntryMealNoteFormValue)=>void
}
const AddMealNoteForm = ({onSubmit}:Props) => {
    const {selectedDate,selectedMealType} = useSelector((state:RootState)=>({selectedDate: state.dailyNotes.selectedDate,selectedMealType: state.dailyNotes.selectedMealType}));
    // const selectedDate:Date = useSelector((state:RootState)=>state.dailyNotes.selectedDate);
    // const selectedMealType:string|undefined= useSelector((state:RootState)=> state.mealNotes.selectedMealType);

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

    return (
        <div>
          
           <Formik
            initialValues={{
                username:'mum',
                date:format(selectedDate, "ccc dd MMM yy"),//from store
                mealType:convertMealTypeStringToEnum(selectedMealType),//from store
                menuDetails:'',
                skippedMeal:false
            }}
            validate={(values)=>validate(values)}
            onSubmit={onSubmit}
           >
               {({isValid,dirty})=> {
                return(
                    <Form className="form ui">
                          {/* <label>
                            <Field type="checkbox" name="skippedMeal" />
                            Skipped this meal
                          </label>
                          <br/> */}
                          <Field
                            label='Skipped this meal'
                            name='skippedMeal'
                            component={CheckboxField}
                          />
                         <Field
                            placeholder='Ex: 2eggs / black coffee with during fasting'
                            name='menuDetails'
                            label='Meal includes / Or Fasting Liquids'
                            component={TextField}
                            multiLines={true}
                         />
                         {/* <Field
                            placeholder='Ex: 120'
                            name='bgBe4Meal'
                            label='Blood glucose before meal'
                            unit='mg/dl'
                            component={TextField}
                          />
                          <Field
                            placeholder='Ex: 120'
                            name='bgAftMeal'
                            label='Blood glucose after meal'
                            unit='mg/dl'
                            component={TextField}
                          />
                          <Field
                            placeholder='Ex: xyz'
                            name='bpBe4Meal'
                            label='Blood pressure before meal'
                            unit='mm/Hg'
                            component={TextField}
                          />
                          <Field
                            placeholder='Ex: xyz'
                            name='bpAftMeal'
                            label='Blood pressure after meal'
                            unit='mm/Hg'
                            component={TextField}
                          /> */}
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
