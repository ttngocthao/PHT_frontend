import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddDailyNoteEntryForm from './AddDailyNoteEntryForm';
import {EntryDailyNoteFormValue} from '../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryDailyNoteFormValue) => void;
  editMode?:boolean;
  error?: string;
}

const AddDailyNoteModal = ({ modalOpen, onClose,onSubmit,error,editMode }: Props) => {   
    return (
         <Modal open={modalOpen} onClose={onClose} closeIcon style={{maxWidth:'400px'}}>
            <Modal.Header>{editMode ? 'Edit this note' : 'Add a new daily note entry'}</Modal.Header>
            <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddDailyNoteEntryForm onSubmit={onSubmit} editMode={editMode}/>
            {/* <AddEntryForm onSubmit={onSubmit} onCancel={onClose} /> */}
            </Modal.Content>            
        </Modal>
    );
};

export default AddDailyNoteModal;