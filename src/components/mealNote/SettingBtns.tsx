import React from 'react';
import { Button } from 'semantic-ui-react';

interface Props{
    mealType:string
    editMealMode:boolean
    editMealHandle: (mealType:string)=>void
}

const SettingBtns = ({mealType,editMealMode,editMealHandle}:Props) => {
    return (
        <div>
            <Button color='orange' onClick={()=>editMealHandle(mealType)}>{editMealMode ? 'Finish Editing' : `Edit ${mealType} Details`}</Button>
            <Button color='red' onClick={()=>alert('confirm delete')}>Delete {mealType} Details</Button>

        </div>
    );
};

export default SettingBtns;
