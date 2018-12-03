import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../../component/usercard/usercard'

@connect(
    state => state.chatuser,
    { getUserList }
)

class Applicant extends Component{
    componentDidMount(){
        this.props.getUserList('Boss')
    }

    render(){
        return(
            <UserCard userlist={this.props.userlist}></UserCard>
        )
    }
}

export default Applicant