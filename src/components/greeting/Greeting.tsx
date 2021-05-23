import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Greeting = () => {
  const currentUser = useSelector((state:RootState)=>state.dailyNotes.currentUser);
  return (
    <div>
      Hello {currentUser}
    </div>
  );
};

export default Greeting;
