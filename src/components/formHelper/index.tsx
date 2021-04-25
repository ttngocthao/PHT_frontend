import React from 'react';
import {Form} from 'semantic-ui-react';
import {Field,ErrorMessage, FieldProps} from 'formik';

interface TextFieldProps extends FieldProps{
    label:string
    placeholder: string
}

export const TextField = ({field,label,placeholder}:TextFieldProps) => {
    return (
        <Form.Field>
            <label>{label}</label>
            <Field
                placeholder={placeholder}
                {...field}
            />
            <div>
                <ErrorMessage name='note'/> 
            </div>                       
        </Form.Field>
    );
};


