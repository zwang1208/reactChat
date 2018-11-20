import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import { register } from '../../redux/user.redux'
import '../../index.css'

const RadioItem = Radio.RadioItem

@connect(
    state => state.user,
    {register}
)

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:'',
            confirmPwd:'',
            type: 'Applicant'
        }
    }

    handleChange(key, val){
        this.setState({
            [key]: val
        })
    }

    handleRegister(){
        this.props.register(this.state)
    }

    render(){
        return(
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}/>: null}
                <Logo></Logo>
                <WingBlank>
                <List>
                    {this.props.msg? <p className='error-msg'>{this.props.msg}</p>: null}
                    <InputItem onChange={v => this.handleChange('user', v)}>Username</InputItem>
                    <InputItem onChange={v => this.handleChange('pwd', v)} type='password'>Password</InputItem>
                    <InputItem onChange={v => this.handleChange('confirmPwd', v) } type='password'>Confirm</InputItem>
                </List>
                <WhiteSpace />
                <List>
                    <RadioItem 
                        checked ={this.state.type ==='Applicant'}
                        onChange ={() => this.handleChange('type', 'Applicant')}>
                        Applicant
                    </RadioItem>
                    <RadioItem 
                        checked ={this.state.type ==='Boss'}
                        onChange ={() => this.handleChange('type', 'Boss')}>
                        Boss
                    </RadioItem>
                </List>
                <WhiteSpace />
                <Button type='primary' onClick={() => this.handleRegister()}>Register</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register