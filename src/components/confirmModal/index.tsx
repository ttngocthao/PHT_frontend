import React from 'react';
import { Button, Confirm } from 'semantic-ui-react';

interface Props{
    confirmOpened: boolean
    confirmContent: string
    confirmHeader: string
    handleCancel: ()=>void
    handleConfirm: ()=>void
}

const index = ({confirmContent,confirmHeader,confirmOpened,handleCancel,handleConfirm}:Props) => {
    return (
         <Confirm
          content={confirmContent}
          header={confirmHeader}
          open={confirmOpened}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          confirmButton={<Button color='red'>Delete</Button>}
        />
    );
};

export default index;
