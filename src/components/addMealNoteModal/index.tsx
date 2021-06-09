import React from 'react';
import {format} from 'date-fns';
import { Modal, Segment } from 'semantic-ui-react';
import AddMealNoteForm from './AddMealNoteForm';
import { useSelector } from 'react-redux';
import {RootState} from '../../store';
import { EntryMealNoteFormValue } from '../../types';


interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit:(values: EntryMealNoteFormValue)=>void;
  editMode:boolean;
  error?: string;
}


const AddMealNoteModal = ({modalOpen,onClose,error,onSubmit,editMode}:Props) => {
  const selectedMealType = useSelector((state:RootState)=>state.dailyNotes.selectedMealType);
  const selectedDate = useSelector((state:RootState)=>state.dailyNotes.selectedDate);
    return (
        <Modal open={modalOpen} onClose={onClose} closeIcon>
            <Modal.Header>{editMode ? 'Edit':'Add'} {selectedMealType} - {format(selectedDate, "ccc dd MMM")}</Modal.Header>
            <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddMealNoteForm onSubmit={onSubmit} editMode={editMode}/>
            </Modal.Content>            
        </Modal>
    );
};

export default AddMealNoteModal;
