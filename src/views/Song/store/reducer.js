import * as actionTypes from './actionTypes';

const initialState = {
    lyric: null
}
export default (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.LYRIC_GET_LYRIC:
            return {
                ...state,
                lyric: action.payload
            }
        default:
            return state;
    }
}
