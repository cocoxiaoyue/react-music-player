import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon } from 'antd';
import * as actionCreators from '../../common/store/actionCreators'
import CollectBlock from './CollectBlock'
import './style.less';

class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
            isShow:true
        }
    }
    componentDidMount(){
        this.props.IndexinitStarredList()
    }

    setMenuClass = (isShow) => (isShow ? 'menu' : 'menu hide');

    setMenuIconType = isShow => (isShow ? 'menu-fold' : 'menu-unfold');

    toggleMenu = () =>{
        this.setState({
            isShow:!this.state.isShow
        })
    }

    render(){
        const { isShow } = this.state;
        const { children, starredList } = this.props
        return(
            <div className={this.setMenuClass(isShow)}>
                <Icon type={this.setMenuIconType(isShow)} onClick={this.toggleMenu} />
            <nav>
                <ul className="nav-list">{React.Children.map(children, link => <li>{link}</li>)}</ul>
                </nav>
        {isShow ? <CollectBlock starredList={starredList} /> : null}
      </div>
        )
    }
}
const mapState = (state) =>({
    starredList: state.playQueue.starredList
});
const mapDispath = (dispatch) =>({
    IndexinitStarredList(){
        dispatch(actionCreators.initStarredList())
    }
});
export default withRouter(connect(mapState,mapDispath)(Menu));
