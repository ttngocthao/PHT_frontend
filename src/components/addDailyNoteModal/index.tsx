import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddDailyNoteEntryForm from './AddDailyNoteEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryDailyNoteFormValue) => void;
  error?: string;
}

const AddDailyNoteModal = ({ modalOpen, onClose,onSubmit,error }: Props) => {   
    return (
         <Modal open={modalOpen} onClose={onClose} closeIcon>
            <Modal.Header>Add a Daily Note entry</Modal.Header>
            <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddDailyNoteEntryForm onSubmit={onSubmit}/>
            {/* <AddEntryForm onSubmit={onSubmit} onCancel={onClose} /> */}
            </Modal.Content>            
        </Modal>
    );
};

export default AddDailyNoteModal;