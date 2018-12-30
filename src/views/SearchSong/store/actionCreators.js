import axios from 'axios';
import * as actionTypes from './actionTypes';
import { SeachSong } from '../../../config/api'

const handleChnageType = song =>({
    type: actionTypes.SEARCH_SONG,
    payload:  song
})
export const handleSeachSong = value => (dispatch) =>{
    axios.get(SeachSong(value)).then((res)=>{
        dispatch(handleChnageType(res.data.result.songs));
    })
};