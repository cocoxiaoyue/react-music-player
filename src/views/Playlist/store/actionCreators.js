import axios from 'axios';
import * as actionTypes from './actionTypes';
import { playlistInfoUrl } from '../../../config/api'

export const hanlePlayList = list =>({
    type: actionTypes.PLAYLIST_INFO,
    payload: list
})
export const changePlayList = (id) => (dispatch) =>{
    axios.get(playlistInfoUrl(id)).then((res) =>{
        if(res.data.code === 200){
            dispatch(hanlePlayList(res.data.playlist))
        }
    })
}
