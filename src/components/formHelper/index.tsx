import React from 'react';
import {Form, Input} from 'semantic-ui-react';
import {Field,ErrorMessage, FieldProps} from 'formik';
import {MealTypeOption} from '../../types';
import styled from 'styled-components';
interface TextFieldProps extends FieldProps{
    label:string
    placeholder: string
    unit?: string
    multiLines?:boolean
}
export type SmallTextFieldProps = Omit<TextFieldProps,'label'>;

export const TextField = ({field,label,placeholder,unit,multiLines}:TextFieldProps) => {
    return (
        <Form.Field>
            <label>{label}</label>
            <Field
                placeholder={placeholder}
                as={multiLines ? 'textarea': 'input'}
                {...field}
            />{unit ? unit : null}
            <div style={{ color:'red' }}>
                <ErrorMessage name={field.name}/> 
            </div>                       
        </Form.Field>
    );
};
const StyledSmallInput = styled(Input)({
    width:'150px',
    display:'inline-block'
});

export const SmallTextField =({field,placeholder}:SmallTextFieldProps)=>{
    return(
       
            <StyledSmallInput size='small'>
                <Field
                    placeholder={placeholder}
                    {...field}
                />
            </StyledSmallInput>
        
    );
};

export const StyledGroupSmallInputs = styled('div')({
    display:'flex', 
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:'10px'
});


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

interface CheckboxFieldProps extends FieldProps{    
    label:string
}

export const CheckboxField =({label,field}:CheckboxFieldProps)=>{
    return (
        <Form.Field>
        <Field                        
            render={()=>{
               return(<div  className='ui checkbox'>
                <input
                type="checkbox"
                {...field}
              />
              <label>{label}</label>
              </div>
               );
           }}
        />
        </Form.Field>
    );
};