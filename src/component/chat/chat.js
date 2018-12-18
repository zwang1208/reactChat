import React, { Component } from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'

@connect(
    state=>state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends Component{
    constructor(props){
        super(props)
        this.state = {
            text:'',
            msg: [],
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
    fixCarousel(){
        setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
    }
    handleSubmit(){
        // socket.emit('sendmsg', {text: this.state.text})
        // this.setState({text: ''})
        const from = this.props.user._id //current user
        console.log(this.props)
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({text: '', showEmoji: false})
    }
    render(){
        //console.log(this.props)
        const Item = List.Item
        const userId = this.props.match.params.user
        const users = this.props.chat.users
        const chatid = getChatId(userId, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid === chatid)
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
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
                {chatmsgs.map((v,index)=>{
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
                            extra={
                                <div>
                                    <span 
                                        onClick={()=>
                                        {this.setState({showEmoji: !this.state.showEmoji})
                                         this.fixCarousel()
                                        }} 
                                        style={{marginRight:15}}>😃</span>
                                    <span onClick={()=>this.handleSubmit()}>Send</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji?
                        <Grid 
                            data={emoji}
                            columnNum ={9}
                            carouselMaxRow={4}
                            isCarousel ={true}
                            onClick={el=>{
                                this.setState({
                                    text: this.state.text + el.text
                                })
                            }}
                        
                        />: null
                    }
                </div>
            </div>
        )
    }
}

export default Chat