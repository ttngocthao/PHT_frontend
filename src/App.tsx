import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {useDispatch} from 'react-redux';
import {getDailyNotes} from './actionCreators.ts/dailyNote.actionCreators';

import HomePage from './views/homepage';
import WeeklyViewPage from './views/weeklyViewPage';

function App() {
  const dispatch = useDispatch();
  const testingBtn =()=>{
    dispatch(getDailyNotes());
  };
  return (
    <div>
     <h1>Personal Health Tracker - React front end</h1>
     <button onClick={testingBtn}>Get all dailyNotes</button>
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
