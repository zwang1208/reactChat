import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import  reducer from './reducer'
import './config'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/Authroute/authroute'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
))



ReactDOM.render(
    (<Provider store ={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path='/login' component={ Login }></Route>
                <Route path='/register' component={ Register }></Route>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)

