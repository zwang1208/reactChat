import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile';
import { Switch, Route } from 'react-router-dom'
import NavLinkbar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Applicant from '../../component/applicant/applicant'
import User from '../../component/user/user'

function Msg(){
    return <h2>msg</h2>
}

@connect(
    state=> state
)

class Dashboard extends Component{
    render(){
        console.log(this.props)
        const user = this.props.user
        const {pathname} = this.props.location
        const navList = [
            {
                path: '/boss',
                text: 'Applicant',
                icon: 'boss',
                title: 'Applicant List',
                component: Boss,
                hide: user.type === 'Applicant'
            },
            {
                path: '/applicant',
                text: 'Boss',
                icon: 'job',
                title: 'Boss List',
                component: Applicant,
                hide: user.type === 'Boss'
        
            },
            {
                path: '/msg',
                text: 'Message',
                icon: 'msg',
                title: 'Message List',
                component: Msg,
            },
            {
                path: '/myinfo',
                text: 'Me',
                icon: 'user',
                title: 'My infomation',
                component: User,
            }
        ]
        return(
            <div>
                <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path === pathname).title}</NavBar>
                <div style={{ marginTop: 45 }}>
                    <Switch>
                        { navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        )) }
                    </Switch>
                </div>
                <NavLinkbar data={navList}></NavLinkbar>
            </div>
        )
    }
}

export default Dashboard