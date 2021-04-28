import React from 'react';
import { Formik,Form,Field } from 'formik';
import { SelectField, TextField } from '../formHelper';
import {Button} from 'semantic-ui-react';
import {MealType,MealTypeOption} from '../../types';

const mealTypeOptions:MealTypeOption[]=[
    {value: MealType.Breakfast,label:'Breakfast'},
    {value: MealType.Lunch,label:'Lunch'},
    {value: MealType.Dinner,label:'Dinner'},
];
interface Props {
    // onSubmit: (values:EntryDailyNoteFormValue)=>void
    onSubmit: ()=>void
}
const AddMealNoteForm = ({onSubmit}:Props) => {
    return (
        <div>
           Form to add meal note will be here
           <Formik
            initialValues={{
                mealType: MealType.Breakfast,
                bgBe4Meal:'',
                bgAftMeal:'',
                bpBe4Meal:'',
                bpAftMeal:'',
                menuDetails:''
            }}
            onSubmit={onSubmit}
           >
               {({isValid,dirty})=> {
                return(
                    <Form className="form ui">
                         <SelectField
                            label='Meal of the day'
                            name='mealType'
                            options={mealTypeOptions}
                         />
                         <Field
                            placeholder='Ex: 2eggs, ham, cheese, avocado, coffee with cream'
                            name='menuDetails'
                            label='Meal includes'
                            component={TextField}
                         />
                         <Field
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
                          />
                          <Button
                            type='submit'
                            floated='right'
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
