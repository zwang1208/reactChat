import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

class Bossinfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            position: '',
            company: '',
            salary: '',
            jd: '',
            avatar: ''
        }
    }
    handleChange(key, val){
        this.setState({
            [key]: val
        })
    }
    render(){
        return (
            <div>
                <NavBar mode="dark">Boss information</NavBar>
                <AvatarSelector selectAvatar={avaName=>{
                    this.setState({
                        avatar: avaName
                    })
                }}></AvatarSelector>
                <InputItem onChange={v=>this.handleChange('position', v)}>
                    Position
                </InputItem>
                <InputItem onChange={v=>this.handleChange('company', v)}>
                    Company
                </InputItem>
                <InputItem onChange={v=>this.handleChange('salary', v)}>
                    Salary
                </InputItem>
                <TextareaItem 
                    title='Description' 
                    onChange={v=>this.handleChange('jd', v)}
                    rows = {3}
                    autoHeight />
                <Button type='primary'>Save</Button>
            </div>
        )
    }
}

export default Bossinfo