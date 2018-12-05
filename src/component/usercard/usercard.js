import React, { Component } from 'react'
import { WingBlank, Card, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends Component{
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)
    }
    render(){
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                {this.props.userlist.map(v=>(
                    v.avatar?(<div key={v._id}><Card onClick={()=>this.handleClick(v)}>
                                        <Header 
                                            title={v.user}
                                            thumb={require(`../img/${v.avatar}.png`)}
                                            extra={<span>{v.position}</span>}
                                            ></Header>
                                        <Body>
                                            {v.type === 'Boss'?(
                                                <div>
                                                    <div>Company: {v.company}</div>
                                                    <div>Salary: {v.salary}</div>
                                                </div>
                                                ):null}
                                            <div>
                                                Description:
                                                {v.desc.split('\n').map(d=>(
                                                    <div key={d}>{d}</div>
                                                ))}
                                            </div>
                                        </Body>    
                                    </Card>
                                    <WhiteSpace></WhiteSpace>
                            </div>): null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard