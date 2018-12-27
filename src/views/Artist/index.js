import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import HotSongs from '@components/List';
import MinorTitle from '@components/MinorTitle';
import * as actionCreators from './store/actionCreators';
import './style.less';

const Header = (props) =>{
    const { img1v1Url, name,musicSize, albumSize, mvSize, briefDesc} = props.artist;
    return(
        <div className="ar-header">
            <div className="avatar">
                <img src={img1v1Url} alt="artist-avatar"/>
            </div>
            <div className="num">
                <span className="name">{name}</span>
                <span>
                    <i className="icon-music"/>歌曲数:{musicSize}
                </span>
                <span>
                    <i className="icon-shocked"/>专辑数:{albumSize}
                </span>
                <span>
                    <i className="icon-film" />MV数:{mvSize}
                </span>
            </div>

            <div className="desc">
                <p>{briefDesc}</p>
            </div>
        </div>
    )
}

const renderArtistInfo = (artistDetail) =>{
    if(!artistDetail) return null
    const { artist, hotSongs } = artistDetail;
    return(
        <Fragment>
            <MinorTitle>歌手信息</MinorTitle>
            <Header artist={artist}/>
            <HotSongs tracks={hotSongs} isShowAr={false}/>
        </Fragment>
    )
}

class ArtistInfo extends Component{
    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.indexGetArtistInfoEffect(id);
    }
    render(){
        const { data } = this.props.artistInfo;
        return(
            <div className="artist-info">
                {renderArtistInfo(data)}
            </div>
        )
    }
}
const mapState = (state) =>({
    artistInfo: state.artistInfo
});

const mapDispatch = (dispatch) =>({
    indexGetArtistInfoEffect(id){
        dispatch(actionCreators.getArtistInfoEffect(id));
    }
});
export default connect(mapState,mapDispatch)(ArtistInfo);
