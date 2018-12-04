import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types'


class AvatarSelector extends Component{
    static propTypes ={
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                            .split(',')
                            .map(v=>({
                                icon: require(`../img/${v}.png`),
                                text: v
                            }))
        const gridHeader = this.state.icon? (<div>
                                                <span>Avatar you choose</span>
                                                <img style={{width:20}} src={this.state.icon} alt=''/>
                                             </div>)
                                             :
                                             'Please choose avatar'
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid 
                        data={avatarList} 
                        columnNum={5}
                        onClick ={ava=>{
                            this.setState(ava)
                            this.props.selectAvatar(ava.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector