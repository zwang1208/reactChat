import io from 'socket.io-client'
import axios from 'axios'
const socket = io('ws://localhost:8010')

//message list
const MSG_LIST = 'MSG_LIST'
//receive message
const MSG_RECV = 'MSG_RECV'
// message read
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}

export function chat(state=initState, action){
    switch(action.type){
        case MSG_LIST:
            return {...state, chatmsg: action.payload.msgs, users:action.payload.users, unread: action.payload.msgs.filter(v=>!v.read&&v.to === action.payload.userid).length}
        case MSG_RECV:
            const n = action.payload.to === action.userid?1:0
            return {...state, chatmsg:[...state.chatmsg, action.payload], unread: state.unread+n}
        // case MSG_READ:
        default:
            return state
    }
}
function msgList(msgs, users, userid){
    return {type: MSG_LIST, payload: {msgs, users, userid}}
}

function msgRecv(msg, userid){
    return {userid, type: MSG_RECV, payload: msg}
}

export function getMsgList(){
    return (dispatch, getState)=>{
        axios.get('/user/getmsglist')
            .then(res=>{
                if(res.status === 200 && res.data.code === 0){
                    //console.log(getState())
                    const userid = getState().user._id
                    dispatch(msgList(res.data.msgs, res.data.users, userid))
                }
            })
    }
}

export function recvMsg(){
    return (dispatch, getState)=>{
        socket.on('receivemsg', function(data){
            console.log('receive message')
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}

export function sendMsg({from, to, msg}){
    return dispatch=>{
        socket.emit('sendmsg',{from, to, msg})
    }
}

