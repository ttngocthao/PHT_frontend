import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {useDispatch} from 'react-redux';
import {initDailyNotes} from './state/actionCreators/dailyNote.actionCreators';

import HomePage from './views/homepage';
import WeeklyViewPage from './views/weeklyViewPage';

function App() {
  const dispatch = useDispatch();
 
  useEffect(() => {
     dispatch(initDailyNotes());
  }, [dispatch]);
  
  return (
    <div style={{padding:'10px',maxWidth:'600px'}}>
     <h1>Personal Health Tracker</h1>   
      <Router>
        <Switch>
          <Route path='/weekly-view'>
            <WeeklyViewPage/>
          </Route>
          <Route path='/'>
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
