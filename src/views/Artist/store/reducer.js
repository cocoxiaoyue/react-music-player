import * as actionTypes from './actionTypes';

const initState = {
    data: null
}
export default (state = initState, action) =>{
    switch (action.type) {
        case actionTypes.ARTIST_INFO:
            return{
                ...state,
                data: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
