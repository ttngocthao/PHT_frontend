import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddMealNoteForm from './AddMealNoteForm';


interface Props {
  modalOpen: boolean;
  onClose: () => void;
//   onSubmit: (values: EntryDailyNoteFormValue) => void;
  onSubmit:()=>void;
  error?: string;
}


const AddMealNoteModal = ({modalOpen,onClose,error,onSubmit}:Props) => {
    return (
        <Modal open={modalOpen} onClose={onClose} closeIcon>
            <Modal.Header>Add a Daily Note entry</Modal.Header>
            <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddMealNoteForm onSubmit={onSubmit}/>
            {/* <AddDailyNoteEntryForm onSubmit={onSubmit}/> */}
            {/* <AddEntryForm onSubmit={onSubmit} onCancel={onClose} /> */}
            </Modal.Content>            
        </Modal>
    );
};

export default AddMealNoteModal;
