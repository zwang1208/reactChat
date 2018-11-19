import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

class Login extends Component{
    constructor(props){
        super(props)
        this.register = this.register.bind(this)
    }

    register(){
        this.props.history.push('/register')
    }
    render(){
        return (
            <div>
                <Logo></Logo>
                <h2>Login</h2>
                <WingBlank>
                    <List>
                        <InputItem>Username</InputItem>
                        <InputItem>Password</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type='primary'>Login</Button>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.register}>Register</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login