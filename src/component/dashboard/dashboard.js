import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile';
import NavLinkbar from '../navlink/navlink'

function Boss(){
    return <h2>boss</h2>
}
function Applicant(){
    return <h2>app</h2>
}
function Msg(){
    return <h2>msg</h2>
}
function User(){
    return <h2>user</h2>
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
                text: 'Boss',
                icon: 'boss',
                title: 'Applicant List',
                component: Boss,
                hide: user.type === 'Applicant'
            },
            {
                path: '/applicant',
                text: 'Applicant',
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
                <NavBar mode='dark'>{navList.find(v=>v.path === pathname).title}</NavBar>
                <NavLinkbar data={navList}></NavLinkbar>
            </div>
        )
    }
}

export default Dashboard