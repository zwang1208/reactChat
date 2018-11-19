import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'

const RadioItem = Radio.RadioItem

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
        console.log(this.state)
    }

    render(){
        return(
            <div>
                <Logo></Logo>
                <WingBlank>
                <List>
                    <InputItem onChange={ v=>this.handleChange('user', v) }>Username</InputItem>
                    <InputItem onChange={ v=>this.handleChange('pwd', v) }>Password</InputItem>
                    <InputItem onChange={ v=>this.handleChange('confirmPwd', v) }>Confirm</InputItem>
                </List>
                <WhiteSpace />
                <RadioItem 
                    checked ={this.state.type ==='Applicant'}
                    onChange ={() => this.handleChange('type', 'Applicant')}
                >
                    Applicant
                </RadioItem>
                <RadioItem 
                    checked ={this.state.type ==='Boss'}
                    onChange ={() => this.handleChange('type', 'Boss')}
                >
                    Boss
                </RadioItem>
                <WhiteSpace />
                <Button type='primary' onClick={() => this.handleRegister()}>Register</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register