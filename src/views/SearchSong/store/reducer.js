import * as actionTypes from './actionTypes'

const initialState = {
    song: null
}
export default (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.SEARCH_SONG:
            return{
                ...state,
                song:action.payload
            }
        default:
            return state;
    }
}