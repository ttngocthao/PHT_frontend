import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddDailyNoteEntryForm from './AddDailyNoteEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  error?: string;
}

const AddDailyNoteModal = ({ modalOpen, onClose,error }: Props) => {   
    return (
         <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
            <Modal.Header>Add a Daily Note entry</Modal.Header>
            <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddDailyNoteEntryForm />
            {/* <AddEntryForm onSubmit={onSubmit} onCancel={onClose} /> */}
            </Modal.Content>
            
        </Modal>
    );
};

export default AddDailyNoteModal;