import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import  reducer from './reducer'
import './config'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/Authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import ApplicantInfo from './container/applicantinfo/applicantinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };
  
  const peristedState = loadState();
  
  

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, peristedState, composeEnhancers(
    applyMiddleware(thunk)
))

store.subscribe(() => {
    saveState(store.getState());
  });

ReactDOM.render(
    (<Provider store ={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/login' component={ Login }></Route>
                    <Route path='/register' component={ Register }></Route>
                    <Route path='/boss_info' component={ BossInfo }></Route>
                    <Route path='/applicant_info' component={ ApplicantInfo }></Route>
                    <Route path='/chat/:user' component={ Chat }></Route>
                    <Route component={ Dashboard }></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)

