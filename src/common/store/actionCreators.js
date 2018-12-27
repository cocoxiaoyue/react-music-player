import axios from 'axios';
import { message } from 'antd';
import * as actionTypes from './actionTypes';

// 把歌单中的歌曲，添加到播放列表中
const playSongAct = song => ({ type: actionTypes.PLAYER_PLAY_SONG, payload: song })
const addSongAct = song => ({ type: actionTypes.PLAYER_ADD_SONG, payload: song })
//更改歌曲
export const changeSong = ({ song, index, flag = '' }) => ({
    type: actionTypes.PLAYER_CHANGE_SONG,
    payload: {
        song,
        index,
        flag,
    },
})
const deleteSongType = (id) =>({
    type: actionTypes.PLAYER_DELETE_SONG,
     payload: id
})
export const deleteSong = (id) => (dispatch) =>{
    dispatch(deleteSongType(id));
}
export const clearQueue = () => ({
    type: actionTypes.PLAYER_CLEAR_QUEUE,
})

const initStarredListAct = (allList) => ({
    type: actionTypes.INIT_STARRED_LIST,
    payload: allList
});
// 初始化本地数据操作
export const initStarredList = () => (dispatch) => {
    const allStarredList = JSON.parse(localStorage.getItem('allStarredList')) || [];
    dispatch(initStarredListAct(allStarredList));
}
//收藏歌单操作
export const star = item => (dispatch) => {
    //先处理本地储存
    const allStarredList = JSON.parse(localStorage.getItem('allStarredList')) || [];
    allStarredList.push(item);
    // 重新初始化本地储存（把push进去的值，重新添加到本地储存中）
    localStorage.setItem('allStarredList',JSON.stringify(allStarredList));
    dispatch(initStarredListAct(allStarredList));
}
export const cancelStar = id => (dispatch) => {
    let index;
    const allStarredList = JSON.parse(localStorage.getItem('allStarredList')) || [];
    //使用循环查找出需要取消收藏的歌单，然后把id（allStarredList中的id）传出来
    for (let i = 0; i < allStarredList.length; i++) {
        const list = allStarredList[i];
        if(list.id === id) {
            index = i;
        }
    }
    // 使用字符串切割的方法，把 allStarredList 中符合条件的元素从收藏列表中删除
    allStarredList.splice(index,1);
    localStorage.setItem('allStarredList',JSON.stringify(allStarredList));
    dispatch(initStarredListAct(allStarredList));
}
// 更新播放器的列表
const playerStatus = status =>({
    type:actionTypes.PLAYER_UPDATE_STATUS,
    payload: status
})
const isContain = (id, playlist) =>{
    const len = playlist.length;
    for (var i = 0; i < len; i++) {
        const song = playlist[i]
        if(song.id === id){
            return true
        }
    }
    return false
}
// 添加列表中的歌曲到播放列表
export const addSong2Que = s => (dispatch, getState) => {
    const { playlist }= getState().playQueue;
    if(isContain(s.id, playlist)){
        return
    }
    axios.get(`https://api.imjad.cn/cloudmusic/?type=song&id=${s.id}`).then((res)=>{
        const { url } = res.data.data[0];
        if(url){
            const song ={
                ...s,
                url
            }
            dispatch(addSongAct(song));
        }else {
            message.error('歌曲直链不存在')
        }
    })
}
export const playSong2Que = s => (dispatch, getState) => {
    const { playlist }= getState().playQueue;
    if(isContain(s.id, playlist)){
        return
    }
    axios.get(`https://api.imjad.cn/cloudmusic/?type=song&id=${s.id}`).then((res)=>{
        const { url } = res.data.data[0];
        if(url){
            const song ={
                ...s,
                url
            }
            dispatch(playSongAct(song));
        }else {
            message.error('歌曲直链不存在')
        }
    })
}
export const updatePlayerStatus = status => (dispatch) =>{
    dispatch(playerStatus(status))
}
