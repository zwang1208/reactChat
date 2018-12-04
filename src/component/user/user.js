import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    { logoutSubmit }
)

class User extends Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        const alert = Modal.alert
        alert('Logout', 'Are you sure?', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Ok', onPress: () => { 
                browserCookie.erase('user_id')
                this.props.logoutSubmit() 
            }},
          ])
        
    }
    render(){
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        console.log(this.props)
        return props.user?(
            <div>           
                <Result 
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt=''/>}
                    title={props.user}
                    message={props.type ==='Boss'?props.company :null}>
                </Result>
                <List renderHeader={()=>'Description'}>
                    <Item multipleLine>
                        {props.position}
                        {props.desc.split('\n').map(d=>(
                            <Brief key={d}>{d}</Brief>
                        ))}
                        {props.salary?<Brief>Salary: {props.salary}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>Log Out</Item>
                </List>
            </div>
        ): <Redirect to={props.redirectTo} />
    }
}

export default User