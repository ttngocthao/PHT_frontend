import React from 'react';
import {Form} from 'semantic-ui-react';
import {Field,ErrorMessage, FieldProps} from 'formik';
import {MealTypeOption} from '../../types';

interface TextFieldProps extends FieldProps{
    label:string
    placeholder: string
    unit?: string
}

export const TextField = ({field,label,placeholder,unit}:TextFieldProps) => {
    return (
        <Form.Field>
            <label>{label}</label>
            <Field
                placeholder={placeholder}
                {...field}
            />{unit ? unit : null}
            <div>
                <ErrorMessage name='note'/> 
            </div>                       
        </Form.Field>
    );
};

type SelectFieldProps ={
    name: string
    label: string
    options: MealTypeOption[]
};

export const SelectField =({name,label,options}:SelectFieldProps)=>{
    return(
        <Form.Field>
            <label>{label}</label>
            <Field as='select' name={name} className='ui dropdown'>
                {options.map((option:MealTypeOption)=> (
                    <option key={option.value} value={option.value}>
                        {option.label || option.value}
                    </option>
                ))}
            </Field>
        </Form.Field>
    );
};
