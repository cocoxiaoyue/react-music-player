import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import ReadyList from '@components/ReadyQueue';
import * as actionCreators from '@common/store/actionCreators';
import { formatDuration, formatCurrentTime } from '@src/utils'
import './style.less';

class Footer extends Component{
    constructor(){
        super();
        this.state = {
            cdt: '00:00',
            curProgressBarWidth: 0,
            curVolBarWidth: '30%',
            ppIcon: 'play-circle',
            lastVolumeIcon: '',
            volumeIcon: '🔊',
            mode: 'listloop',
            modeIcon: <span role="img" aria-label="list" title="列表循环">🔁</span>,
            showReadyList: false,
        }
    }
    // 组件的生命周期函数=>组件完成更新后立即调用。初始化时不会被调用
    componentDidUpdate(prevProps){
        // 这里当成是redux的回调
        if(this.props.playQueue.song.id !== prevProps.playQueue.song.id){
            this.changeSongCallBack()
        }
    }
    toPlay = () =>{
        this.audio.play();
        this.setState({ppIcon:'pause-circle'});
        this.updatePlayingStatus(true);
        // this.audio.addEventListener('durationchange',console.log(1))
    }
    toPause = () =>{
        this.audio.pause();
        this.setState({ppIcon:'play-circle'});
    }
    syncTime = () =>{
        const { song } = this.props.playQueue;
        const duration = song.dt || song.duration;
        const timeScale = (this.audio.currentTime * 1000) / duration;
        this.setState({
            curProgressBarWidth: `${timeScale * 100}%`,
            cdt: formatCurrentTime(this.audio.currentTime)
        })
        this.updateCurrentTime();
    }
    updateCurrentTime = () =>{
        this.props.indexUpdatePlayerStatus({
            currentTime: this.audio.currentTime,
        })
    }
    updatePlayingStatus = (status) =>{
        this.props.indexUpdatePlayerStatus({
            isPlaying:status
        })
    }
    togglePlay = () =>{
        if(this.audio.paused || this.audio.ended){
            this.toPlay();
        }else{
            this.toPause();
        }
    }
    setCurTime = (e) =>{
        const { left } = this.progressBar.getBoundingClientRect();
        const distance = e.clientX - left;
        const scale = distance / this.progressBar.offsetWidth;
        // audio 标签内有duration，数据对象中也有dt，不过dt = 1000 * duration
        this.audio.currentTime = this.audio.duration * scale;
        this.setState({
            curProgressBarWidth: `${scale * 100}%`,
        })
        console.log(this.state.curProgressBarWidth);
        this.updateCurrentTime();
    }
    // 声音
    toggleMute = () =>{
        this.audio.muted = !this.audio.muted;
        if(this.audio.muted){
            this.setState({
                lastVolumeIcon: this.state.volumeIcon,
                volumeIcon: '🔇'
            })
        }else {
            this.setState({
                volumeIcon: this.state.lastVolumeIcon
            })
        }
    }
    setVol = (e) =>{
        const { left } = this.valBar.getBoundingClientRect();
        const distance = e.clientX - left;
        const scale = distance / this.valBar.offsetWidth;
        this.audio.volume = scale;
        let volumeIcon
        if(scale > 0 && scale < 0.5){
            volumeIcon = '🔉';
        }else if(scale >= 0.5 && scale <=1) {
            volumeIcon = '🔊';
        }
        this.setState({
            volumeIcon,
            curVolBarWidth: `${distance}px`
        })
    }

    // 播放模式
    setMode = () =>{
        const { mode } = this.state;
        // 列表循环 => 顺序播放
        const listloop = () =>{
            this.setState({
                mode: 'sequential',
                modeIcon: <span role="img" aria-label="list" title="顺序播放">↩️</span>,
            })
        }
        // 顺讯播放 => 单曲循环
        const sequential = () =>{
            this.setState({
                mode: 'singleCycle',
                modeIcon: <span role="img" aria-label="list" title="单曲循环">🔂</span>
            },() => {
                this.audio.loop = true
            })
        }
        // 单曲循环 => 随机播放
        const singleCycle = () =>{
            this.setState({
                mode: 'shuffleplay',
                modeIcon: <span role="img" aria-label="list" title="随机播放">🔀</span>
            },() => {
                this.audio.loop = false
            })
        }
        // 随机播放 => 列表循环
        const shuffleplay = () =>{
            this.setState({
                mode: 'listloop',
                modeIcon: <span role="img" aria-label="list" title="列表循环">🔁</span>
            })
        }
        const modeMap = {
            listloopTest: listloop,
            sequentialTest:sequential,
            singleCycleTest: singleCycle,
            shuffleplayTest: shuffleplay
        }
        // 当点击完全部模式时，就会回到最初的状态
        if(mode === "listloop"){
            modeMap.listloopTest()
        }else if(mode === "sequential"){
            modeMap.sequentialTest()
        }else if(mode ==="singleCycle"){
            modeMap.singleCycleTest()
        }else if(mode ==="shuffleplay"){
            modeMap.shuffleplayTest()
        }
    }
    toggleReadyList = () =>{
        this.setState({
            showReadyList: !this.state.showReadyList
        })
    }
    // 切换歌曲
    // 上一首
    preSong = () =>{
        let { index } = this.props.playQueue;
        const { mode } = this.state;
        const { playlist } = this.props.playQueue;
        // 由index控制播放的歌曲的是按照playlist中的排序来的
        index -= 1;
        // 若是当前在playlist中是第一首歌，则跳转到最后的一首，即length-1
        if(index === -1){
            index=playlist.length - 1;
        }
        // 若当前播放模式是随机的话，即随机跳转一首歌曲
        if(mode === 'shuffleplay'){
             index = Math.floor(Math.random() * playlist.length)
        }
        const song = playlist[index];
        this.props.indexChangeSong({ song, index })
    }
    // 下一首
    nextSong = () =>{
        let { index } = this.props.playQueue;
        const { mode } = this.state;
        const { playlist } = this.props.playQueue;
        index += 1;
        // 若是当前在playlist中是第一首歌，则跳转到最后的一首，即length-1
        if(index === playlist.length){
            index=0;
        }
        // 若当前播放模式是随机的话，即随机跳转一首歌曲
        if(mode === 'shuffleplay'){
             index = Math.floor(Math.random() * playlist.length)
        }
        const song = playlist[index];
        this.props.indexChangeSong({ song, index })
    }
    // 播放键优化
    changeSongCallBack = () =>{
        const { ppIcon } = this.state;
        // 暂停状态下切歌保持暂停状态
        // 播放状态下切歌，保持播放状态
        // ppIcon === 'pause-circle' 说明图标当前是暂停的，是播放状态
        // flag === PLAY_SONG 是歌曲的切换按钮被点击
        // 这里不需要担心flag对上下切换的影响 因为上下切换[changeSong]会默认重置flag
        if(ppIcon === 'pause-circle' || this.props.playQueue.flag === 'PLAY_SONG'){
            this.toPlay();
        }
    }
    render(){
        const { volumeIcon,
                modeIcon,
                ppIcon,
                curProgressBarWidth,
                curVolBarWidth,
                showReadyList
             } = this.state;
        const { song } = this.props.playQueue;
        const duration = song.duration || song.dt;
        const artists = song.artists || song.ar
        const album = song.album || song.al
        return(
            <footer key="player">
                <audio
                    key="audio"
                    src={song.url}
                    ref={(node) =>{
                        this.audio=node
                    }}
                    onTimeUpdate={this.syncTime}
                    >
                    您的浏览器不支持audio标签，无法播放音乐
                </audio>
                <div className="player-album">
                    <Link to={{ pathname:`/lyric/${song.id}`}}>
                        <img src={album.picUrl} alt="album-img"/>
                    </Link>
                </div>
                <div className="player-btns">
                    <Icon type="backward" onClick={this.preSong}/>
                    <Icon type={ppIcon} onClick={this.togglePlay} />
                    <Icon type="forward"  onClick={this.nextSong}/>
                </div>
                <div className="player-state">
                    <div className="player-state-top">
                        <span className="name">{song.name}</span>
                        <div className="artist">
                            {artists.map(v=>(
                                <Link key={v.id} to={{ pathname: `/artistinfo/${v.id}` }}>
                                    {v.name}
                                </Link>
                            ))}
                        </div>
                        <div className="duration">
                            {this.state.cdt}/{formatDuration(duration)}
                        </div>
                    </div>

                    <div className="player-state-bottom">
                        <div
                            className="progress-bar"
                            ref={(node) =>{
                                this.progressBar = node;
                            }}
                            onClick={(e) =>{
                                this.setCurTime(e);
                            }}
                        >
                            <div
                                className="current-progress" style={{width:`${curProgressBarWidth}`}}

                            />
                        </div>
                    </div>
                </div>

                <div className="vol-wrapper">
                    <div className="vol">
                        <span
                            onClick={this.toggleMute}
                        >
                            {volumeIcon}
                        </span>
                        <div
                            className="vol-bar"
                            onClick={this.setVol}
                            ref={(node) =>{
                                this.valBar=node
                            }}
                        >
                            <div
                                className="current-vol"
                                style={{width:`${curVolBarWidth}`}}
                            />
                        </div>
                    </div>
                </div>

                <div className="player-extra">
                    <div
                        className="mode-title"
                        onClick={this.setMode}
                        ref={(node) =>{
                            this.changePlayer = node;
                        }}
                    >
                        {modeIcon}
                    </div>
                    <Icon type="heart-o"/>
                    <Icon type="bars" onClick={this.toggleReadyList}/>
                    {showReadyList ? <ReadyList /> : null}
                </div>
            </footer>
        )
    }
}
const mapState = (state) =>{
    return{
        playQueue: state.playQueue
    }
};
const mapDispatch = (dispatch) =>({
    indexChangeSong({ song, index}){
        dispatch(actionCreators.changeSong({ song, index}));
    },
    indexUpdatePlayerStatus(status){
        dispatch(actionCreators.updatePlayerStatus(status));
    }
});
export default connect(mapState,mapDispatch)(Footer);
