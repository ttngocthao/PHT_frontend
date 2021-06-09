import React from 'react';
import { Button } from 'semantic-ui-react';

interface Props{
    mealType:string
    editMealMode:boolean
    editMealHandle: ()=>void
}

const SettingBtns = ({mealType,editMealMode,editMealHandle}:Props) => {
    return (
        <div>
            <Button color='orange' onClick={editMealHandle}>{editMealMode ? 'Finish Editing' : `Edit ${mealType} Details`}</Button>
            <Button color='red' onClick={()=>alert('confirm delete')}>Delete {mealType} details</Button>

        </div>
    );
};

export default SettingBtns;
