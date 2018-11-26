import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'

class NavLinkBar extends Component{
    static propTypes ={
        data: PropTypes.array.isRequired
    }
    render(){
        const navList = this.props.data.filter(v=>!v.hide)
        console.log(navList)
        return(
            <TabBar>
                {navList.map(v=>(
                    <TabBar.Item 
                        key={v.path} 
                        title={v.text}
                        icon={{url: require(`./img/${v.icon}.png`)}}>                      
                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}

export default NavLinkBar