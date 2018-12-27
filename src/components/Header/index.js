import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Input } from 'antd';
import { Link } from 'react-router-dom';
import menuInfo from '../../router/menu'
import './style.less';

const getTitle = (m, p) =>{
    const matchMenu = m.filter(v => p.indexOf(v.path) !== -1);
    return (matchMenu[0] && matchMenu[0].title) || '后退'
}
class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    goBack = () => {
        const { history } = this.props;
        history.goBack();
        }
    // 把输入的值变为存储起来
    handleChange(event){
        this.setState({value: event.target.value});
    }
    // 搜索歌曲
    handleSelectSong = () =>{
    }
    render(){
        const {pathname} = this.props.location;
        const title = getTitle(menuInfo, pathname);
        const songStr = this.state.value;
        return(
            <header>
                <div className="left">
                    <Icon type="arrow-left" onClick={this.goBack}/>
                    <h2 className="title">{title}</h2>
                </div>
                <Input
                    size="small"
                    className="inputText"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                {
                    songStr ? (
                        <Link to={{pathname:`/search/${songStr}`}}>
                            <Icon 
                                type="search" 
                                className="search" onClick={this.handleSelectSong}/>
                         </Link>)
                         : (
                            <Icon 
                            type="search" 
                            className="search" onClick={this.handleSelectSong}/>)
                }
               
                <Icon type="close" className="right" />
            </header>
        )
    }
}
export default withRouter(Header);
