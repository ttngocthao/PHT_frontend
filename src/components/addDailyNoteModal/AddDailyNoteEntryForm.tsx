import React from 'react';
import {format} from 'date-fns';
import { Field, Formik, Form } from "formik";
import {Button} from 'semantic-ui-react';
import {TextField} from '../formHelper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// interface DailyNoteFormValues {
//     note?: string
//     fastingHours: string
//     sleepingHours: string
// }
interface Props {
    onSubmit: (values:EntryDailyNoteFormValue)=>void
}
const AddDailyNoteEntryForm = ({onSubmit}:Props) => {
    const dailyNoteState = useSelector((state:RootState)=>state.dailyNotes);
    const {selectedDate}= dailyNoteState;
    
    // const validate=(values:DailyNoteFormValues)=>{
    //     const requiredError = "Field is required";
    //     // const dateError = 'Incorrect date format';
    //     const errors: { [field: string]: string } = {};
       
      
    //     return errors;
    // };
   
    return (
        <Formik
            initialValues={{
                date:format(selectedDate, "ccc dd MMM yy"),
                username:'mum',//this will be replaced to dynamic username 
                note:'',
                fastingHours:'',
                sleepingHours:''
            }}
            onSubmit={onSubmit}
            // validate={(values)=>validate(values)}
        >
            {({isValid,dirty})=> {
                return(
                    <Form className="form ui">
                          Form will be here <br/>
                          <Field
                            placeholder='Ex: slept well last night...etc'
                            name='note'
                            label='How are you feeling today?'
                            component={TextField}
                          />
                         <Field
                            placeholder='Ex: 12hours'
                            name='fastingHours'
                            label='Fasting hours'
                            component={TextField}
                          />
                         <Field
                            placeholder='Ex: 7hours'
                            name='sleepingHours'
                            label='Sleeping hours'
                            component={TextField}
                          />
                       
                        <br/>
                        <Button
                            type='submit'
                            floated='right'
                            disabled={!dirty || !isValid}
                        >
                            Save Note
                        </Button>
                    </Form>
                );
            }}

          
        </Formik>
    );
};

export default AddDailyNoteEntryForm;
