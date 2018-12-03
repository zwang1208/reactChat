import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {update}
)

class Applicantinfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            position: '',
            resume:'',
        }
    }
    handleChange(key, val){
        this.setState({
            [key]: val
        })
    }
    render(){
        const redirect = this.props.redirectTo
        const path = this.props.location.pathname
        return (
            <div>
                {redirect && redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
                <NavBar mode="dark">Applicant information</NavBar>
                <AvatarSelector selectAvatar={avaName=>{
                    this.setState({
                        avatar: avaName
                    })
                }}></AvatarSelector>
                <InputItem onChange={v=>this.handleChange('position', v)}>
                    Position
                </InputItem>
                <TextareaItem 
                    title='Description' 
                    onChange={v=>this.handleChange('resume', v)}
                    rows = {3}
                    autoHeight />
                <Button type='primary' onClick={()=>{
                    this.props.update(this.state)
                }}>Save</Button>
            </div>
        )
    }
}

export default Applicantinfo