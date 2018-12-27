import axios from 'axios';
import * as actionTypes from './actionTypes'

const handleChnageType = song =>({
    type: actionTypes.SEARCH_SONG,
    payload:  song
})
export const handleSeachSong = value => (dispatch) =>{
    axios.get(`http://localhost:4000/search?keywords=${value}`).then((res)=>{
        dispatch(handleChnageType(res.data.result.songs));
    })
};