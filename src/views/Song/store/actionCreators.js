import axios from 'axios';
import * as actionTypes from './actionTypes';
import { lyricUrl } from '../../../config/api'

const getPlaylistInfoAction = data =>({
    type: actionTypes.LYRIC_GET_LYRIC,
    payload: data
});
export const fetchLyric = id => (dispatch) =>{
    axios.get(lyricUrl(id)).then((res)=>{
        dispatch(getPlaylistInfoAction(res.data));
    })
};
