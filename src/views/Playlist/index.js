import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import InfoList from '@components/List';
import { star, cancelStar } from '@common/store/actionCreators'
import InfoHeader from './header';
import * as actionCreators from './store/actionCreators';
import './style.less';

class PlaylistInfo extends Component {
    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.handleChange(id);
    }

    componentWillReceiveProps(nextProps){
        //处理组件相同路由切换页面不刷新的问题
        const { id } = nextProps.match.params;
        const preId = this.props.match.params.id;
        if(id !== preId){
            nextProps.handleChange(id);
        }
    }

    beforeStar = () =>{
        // 把这个方法传递给子组件，子组件点击是触发
        const { playlist } = this.props.playlistInfo;
        const { id, name, coverImgUrl } = playlist;
        const parseList = {
            id,
            name,
            coverImgUrl
        };
        this.props.getStar(parseList);
    }
    beforeCancelStar = () =>{
        //与上面方法的效果相反，但是传递是一样的
        const { playlist } = this.props.playlistInfo;
        const { id } = playlist;
        this.props.cancelItemStar(id);
    }
    render(){
        const { playlist } = this.props.playlistInfo;
        const { tracks, coverImgUrl } = playlist || {} ;
        return(
            <Fragment>
                {playlist ? (
                    <div className="playlist-wrapper">
                        <img src={coverImgUrl} alt="background" className="background" key="bgc"/>
                        <div className="playlist-info" key="playlist">
                            <InfoHeader
                                playlist={playlist}
                                beforeStar={this.beforeStar}
                                beforeCancelStar={this.beforeCancelStar}
                            />
                            <InfoList tracks={tracks}/>
                        </div>
                    </div>
                ) : null}
            </Fragment>
        )
    }
}
const mapState = (state) =>({
    playlistInfo: state.playlistInfo,
    starredList: state.playQueue.starredList
});

const mapDispath = (dispatch) =>({
    handleChange(id){
        dispatch(actionCreators.changePlayList(id));
    },
    getStar(item){
        dispatch(star(item));
    },
    cancelItemStar(id){
        dispatch(cancelStar(id))
    }
});

export default connect(mapState,mapDispath)(PlaylistInfo);
