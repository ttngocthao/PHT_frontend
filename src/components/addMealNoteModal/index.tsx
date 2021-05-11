import React from 'react';
import {format} from 'date-fns';
import { Modal, Segment } from 'semantic-ui-react';
import AddMealNoteForm from './AddMealNoteForm';
import { useSelector } from 'react-redux';
import {RootState} from '../../store';


interface Props {
  modalOpen: boolean;
  onClose: () => void;
//   onSubmit: (values: EntryDailyNoteFormValue) => void;
  onSubmit:()=>void;
  error?: string;
}


const AddMealNoteModal = ({modalOpen,onClose,error,onSubmit}:Props) => {
  const selectedMealType = useSelector((state:RootState)=>state.mealNotes.selectedMealType);
  const selectedDate = useSelector((state:RootState)=>state.dailyNotes.selectedDate);
    return (
        <Modal open={modalOpen} onClose={onClose} closeIcon>
            <Modal.Header>Add {selectedMealType} - {format(selectedDate, "ccc dd MMM")}</Modal.Header>
            <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddMealNoteForm onSubmit={onSubmit}/>
            </Modal.Content>            
        </Modal>
    );
};

export default AddMealNoteModal;
