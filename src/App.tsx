import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {useDispatch} from 'react-redux';
import {getDailyNotes} from './actionCreators/dailyNote.actionCreators';

import HomePage from './views/homepage';
import WeeklyViewPage from './views/weeklyViewPage';

function App() {
  const dispatch = useDispatch();
 
  useEffect(() => {
     dispatch(getDailyNotes());
  }, [dispatch]);
  
  return (
    <div>
     <h1>Personal Health Tracker - React front end</h1>   
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
