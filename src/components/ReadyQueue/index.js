import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './ListItem';
import * as actionCreators from '../../common/store/actionCreators'
import './style.less';

class ReadyList extends Component{
    render(){
        const { playlist, song } = this.props.playQueue
        return(
            <div className="readylist">
                <div className="list-head">
                    <div>播放列表</div>
                    <div>收藏全部</div>
                    <div className="clear" onClick={this.props.indexclearQueue}>清空</div>
                </div>
                <ul className="list-body">
                    {playlist.map((songInList, index)=>(
                        <Item
                            key={songInList.id}
                            songInList={songInList}
                            song={song}
                            index={index}
                            changeSong={this.props.indexChangeSong}
                            deleteSong={this.props.indexDeleteSong}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}
const mapState = (state) =>({
    playQueue: state.playQueue
});
const mapDispatch = (dispatch) =>({
    indexChangeSong({ song, index, flag }){
        dispatch(actionCreators.changeSong({ song, index, flag }))
    },
    indexDeleteSong(id){
        dispatch(actionCreators.deleteSong(id))
    },
    indexclearQueue(){
        dispatch(actionCreators.clearQueue())
    }
});
export default connect(mapState,mapDispatch)(ReadyList);
