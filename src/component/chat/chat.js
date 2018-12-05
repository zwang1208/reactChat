import React, { Component } from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'

@connect(
    state=>state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends Component{
    constructor(props){
        super(props)
        this.state = {
            text:'',
            msg: []
        }
    }
    componentDidMount(){
        // socket.on('receivemsg', (data)=>{
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    handleSubmit(){
        // socket.emit('sendmsg', {text: this.state.text})
        // this.setState({text: ''})
        const from = this.props.user._id //current user
        console.log(this.props.user._id )
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({text: ''})
    }
    render(){
        console.log(this.props)
        const Item = List.Item
        const userId = this.props.match.params.user
        const users = this.props.chat.users
        //if no id, return null
        if(!users[userId]){
            return null
        }
        return (
            <div id='chat-page'>
                <NavBar 
                    mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    { users[userId].name }
                </NavBar>
                {this.props.chat.chatmsg.map((v,index)=>{
                    console.log(v.from)
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from==userId?(
                        <List key={index}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ):(
                        <List key={index}>
                            <Item className='chat-me' extra={<img src={avatar}/>}>{v.content}</Item>
                        </List>
                    )
                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='type....'
                            value = {this.state.text}
                            onChange={v=>{
                                this.setState({text: v})
                            }}
                            extra={<span onClick={()=>this.handleSubmit()}>Send</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat