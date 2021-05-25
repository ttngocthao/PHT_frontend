import React,{Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {useDispatch} from 'react-redux';
import {initDailyNotes} from './state/actionCreators/dailyNote.actionCreators';

import HomePage from './views/homepage';
import WeeklyViewPage from './views/weeklyViewPage';

import Header from './components/header/Header';
import GlobalStyle from './GlobalStyles';

function App() {
  const dispatch = useDispatch();
 
  useEffect(() => {
     dispatch(initDailyNotes());
  }, [dispatch]);
  
  return (
    <Fragment>
    <GlobalStyle/>
    <section style={{maxWidth:'600px'}}>
      
        <Router>
          <Header/>
          <main style={{padding:'10px',marginTop:'0rem'}}>
            <Switch>
              <Route path='/weekly-view'>
                <WeeklyViewPage/>
              </Route>
              <Route path='/'>
                <HomePage/>
              </Route>
            </Switch>
          </main>
        </Router>
          
    </section>
    </Fragment>
  );
}

export default App;
