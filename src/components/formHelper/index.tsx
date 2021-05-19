import React from 'react';
import {Form, Input} from 'semantic-ui-react';
import {Field,ErrorMessage, FieldProps} from 'formik';
import {MealTypeOption} from '../../types';
import styled from 'styled-components';
interface TextFieldProps extends FieldProps{
    label:string
    placeholder: string
    unit?: string
}
export type SmallTextFieldProps = Omit<TextFieldProps,'label'>;

export const TextField = ({field,label,placeholder,unit}:TextFieldProps) => {
    return (
        <Form.Field>
            <label>{label}</label>
            <Field
                placeholder={placeholder}
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
// interface ArrayTextFieldProps extends FieldProps{
//     label:string
//     placeholder1: string
//     placeholder2: string
//     values?: Measurement[] | Medication[]
    
// }
// export const ArrayTextField = ({field,label,placeholder1,placeholder2,values}:ArrayTextFieldProps)=>{
//     return(
//         <>
//         <div className='field'>
//             <label >{label}</label>
//         </div>
        
//         <div>
//             {values && values.map((m,i)=>(
//                 <div key={i} style={{display:'flex', justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
//                     <Field                                                    
//                         placeholder={placeholder1}
//                         name={`medication.${i}.medName`}
//                         component={SmallTextField}
//                         />
//                     <span>at</span>  
//                     <Field
//                         component={SmallTextField}
//                         placeholder={placeholder2}
//                         name={`medication.${i}.time`}
//                     />
                        
//                 </div>
//             ))}
//             <Button type='button' onClick={()=>arrayHelpers.push({medName:'',time:''})}>
//                 Add more Medication or Supplement
//             </Button>
//         </div>
//         </>
//     );
// };


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
