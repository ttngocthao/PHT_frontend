import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './homepage';
import WeeklyViewPage from './weeklyViewPage';

function App() {
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
