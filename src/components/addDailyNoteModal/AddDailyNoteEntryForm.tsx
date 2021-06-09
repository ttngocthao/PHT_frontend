import React from 'react';
import {format} from 'date-fns';

import { Field, Formik, Form, FieldArray } from "formik";
import {Button} from 'semantic-ui-react';
import { SmallTextField, TextField, StyledGroupSmallInputs} from '../formHelper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {EntryDailyNoteFormValue,DailyNoteState} from '../../types';


// interface DailyNoteFormValues {
//     note?: string
//     fastingHours: string
//     sleepingHours: string
// }



interface Props {
    onSubmit: (values:EntryDailyNoteFormValue)=>void
    editMode?: boolean
}
const AddDailyNoteEntryForm = ({onSubmit,editMode}:Props) => {
    const dailyNoteState:DailyNoteState = useSelector((state:RootState)=>state.dailyNotes);
    const selectedDayNote = useSelector((state:RootState)=>state.dailyNotes.selectedDayNote);
    const {selectedDate}= dailyNoteState;
    //! if editMode is true, get selectedDailyNote from Store
    //! pass it into initial Values.

    // const validate=(values:DailyNoteFormValues)=>{
    //     const requiredError = "Field is required";
    //     // const dateError = 'Incorrect date format';
    //     const errors: { [field: string]: string } = {};
       
      
    //     return errors;
    // };
    if(editMode){
        console.log('selectedDayNote',selectedDayNote);
    }
   
  


    return (
        <Formik
            initialValues={{
                date:format(selectedDate, "ccc dd MMM yy"),
                username:'mum',//this will be replaced to dynamic username 
                note:editMode ? (selectedDayNote?.note || '') :'',
                fastingHours: editMode ? (selectedDayNote?.fastingHours || '') : '',
                sleepingHours: editMode ? (selectedDayNote?.sleepingHours || '') : '',
                activities: editMode ?( selectedDayNote?.activities || '') :'',
                beverages: editMode ? (selectedDayNote?.beverages || '') :'',
                bloodGlucose:editMode? selectedDayNote?.bloodGlucose :[{
                    time:'',
                    readingNo:''
                }],
                bloodPressure:editMode ? selectedDayNote?.bloodPressure : [{
                    time:'',
                    readingNo:''
                }],
                medication: editMode ? selectedDayNote?.medication: [{
                    time:'',
                    medName:''
                }]
            }}
            onSubmit={onSubmit}
            // validate={(values)=>validate(values)}
        >
            {({isValid,dirty,values})=> {
                return(
                    <Form className="form ui">
                         
                          <Field
                            placeholder='Ex: slept well last night, constipation, menstruation starts...etc'
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
                        <Field
                            placeholder='Ex:swimming, strength training...'
                            name='activities'
                            label='Activities or Events'
                            component={TextField}
                        />
                        <Field
                            placeholder='Ex: celery juice...'
                            name='beverages'
                            label='Beverages'
                            component={TextField}
                        />
                        <div>                            
                            <FieldArray 
                                name='medication'
                                render={ arrayHelpers=>(
                                    <>
                                   <div className='field'>
                                    <label >Medication / Supplement</label>
                                   </div>
                                    
                                    <div>
                                        {values.medication?.map((m,i)=>(
                                            <StyledGroupSmallInputs key={i}>
                                                <Field                                                    
                                                    placeholder='Ex: Multi vitamins...'
                                                    name={`medication.${i}.medName`}
                                                    component={SmallTextField}
                                                    />
                                                   <span>at</span>  
                                                <Field
                                                    component={SmallTextField}
                                                    placeholder='Ex: at lunch / 11:30am ...'
                                                    name={`medication.${i}.time`}
                                                />
                                                  
                                            </StyledGroupSmallInputs>
                                        ))}
                                        <Button type='button' onClick={()=>arrayHelpers.push({medName:'',time:''})}>
                                            Add more Medication/Supplement
                                        </Button>
                                    </div>
                                    </>
                                )}
                            />                           
                        </div>
                        <br/>
                        <div>
                            <FieldArray
                                name='bloodGlucose'
                                render={ arrayHelpers=>(
                                    <>
                                    <div className='field'>
                                        <label >Blood Glucose Measurement</label>
                                    </div>
                                    <div> 
                                       {values.bloodGlucose?.map((v,i)=>(
                                            <StyledGroupSmallInputs key={i}>
                                                <Field                                                    
                                                    placeholder='Ex: 120'
                                                    name={`bloodGlucose.${i}.readingNo`}
                                                    component={SmallTextField}
                                                    />
                                                <span>at</span>  
                                                <Field
                                                    component={SmallTextField}
                                                    placeholder='Ex: at lunch / 11:30am ...'
                                                    name={`bloodGlucose.${i}.time`}
                                                />
                                            </StyledGroupSmallInputs>
                                        ))}
                                        <Button type='button' onClick={()=>arrayHelpers.push({readingNo:'',time:''})}>
                                            Add more Measurement  
                                        </Button></div>
                                       
                                    </>
                                )}
                            />
                        </div>
                        <br/>
                        <div>
                            <FieldArray
                                name='bloodPressure'
                                render={ arrayHelpers=>(
                                    <>
                                    <div className='field'>
                                        <label >Blood Pressure Measurement</label>
                                    </div>
                                    <div> 
                                       {values.bloodPressure?.map((v,i)=>(
                                            <StyledGroupSmallInputs key={i}>
                                                <Field                                                    
                                                    placeholder='Ex: 120'
                                                    name={`bloodPressure.${i}.readingNo`}
                                                    component={SmallTextField}
                                                    />
                                                <span>at</span>  
                                                <Field
                                                    component={SmallTextField}
                                                    placeholder='Ex: at lunch / 11:30am ...'
                                                    name={`bloodPressure.${i}.time`}
                                                />
                                            </StyledGroupSmallInputs>
                                        ))}
                                        <Button type='button' onClick={()=>arrayHelpers.push({readingNo:'',time:''})}>
                                            Add more Measurement
                                        </Button></div>
                                       
                                    </>
                                )}
                            />
                        </div>
                        <br/>
                        
                        <Button
                            type='submit'
                            floated='right'
                            disabled={!dirty || !isValid}
                            color={isValid ? 'orange' :'grey'}
                        >
                           {editMode ? 'Finish Editing' : 'Save new note' }
                        </Button>
                    </Form>
                );
            }}

          
        </Formik>
    );
};

export default AddDailyNoteEntryForm;
