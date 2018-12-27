import React, { Component } from 'react';
import * as actionCreators from './store/actionCreators';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Lyric from './lyric';
import './style.less';

class SongDetailPage extends Component{
    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.indexFetchLyric(id);
    }
    goBack = () => {
        const { history } = this.props;
        history.goBack();
        }
    render(){
        const { currentTime, song } = this.props.playQueue;
        const { lyric } = this.props.lyric;
        const album = song.album || song.al;
        const coverImg = album.picUrl;
        return(
            <div className="song">
                <div>
                    <div className="detail-page">
                        <div>
                            <div
                                style={{ backgroundImage: `url(${coverImg})`}}
                                className="filter"
                            />
                            <div className="left">
                                <img
                                    src={coverImg}
                                    alt="album-img"
                                    className="album-img"/>
                            </div>
                            <div className="right">
                                <div className="name">{song.name}</div>
                                <Lyric lyric={lyric} currentTime={currentTime}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapState = (state) =>({
    playQueue: state.playQueue,
    lyric: state.lyric,
});
const mapDispath = (dispatch) =>({
    indexFetchLyric(id){
        dispatch(actionCreators.fetchLyric(id));
    }
});
export default connect(mapState,mapDispath)(withRouter(SongDetailPage));
