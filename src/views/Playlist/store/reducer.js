import * as actionTypes from './actionTypes';

const initState ={
    playlist: null
}

export default (state = initState, action) =>{
    switch (action.type) {
        case actionTypes.PLAYLIST_INFO:
            return {
                ...state,
                playlist: action.payload,
                isFetching: false
            }
        default:
            return {
                ...state,
            }
    }
}
