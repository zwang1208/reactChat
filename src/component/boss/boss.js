import React, { Component } from 'react'
import axios from 'axios';
import { WingBlank, Card, WhiteSpace } from 'antd-mobile';


class Boss extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        axios.get('/user/list?type=Applicant')
            .then(res=>{
                if(res.data.code === 0){
                    this.setState({data: res.data.data})
                }
            })
    }

    render(){
        //console.log(this.state)
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                {this.state.data.map(v=>(
                    v.avatar?(<div><Card key={v._id}>
                                        <Header 
                                            title={v.user}
                                            thumb={require(`../img/${v.avatar}.png`)}
                                            extra={<span>{v.position}</span>}
                                            ></Header>
                                        <Body>
                                            {v.resume.split('\n').map(v=>(
                                                <div key={v}>{v}</div>
                                            ))}
                                        </Body>    
                                    </Card>
                                    <WhiteSpace></WhiteSpace>
                            </div>): null
                ))}
            </WingBlank>
        )
    }
}

export default Boss