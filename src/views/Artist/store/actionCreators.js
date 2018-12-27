import { artistInfoUrl } from '../../../config/api';
import * as actionTypes from './actionTypes';
import request from '@common/request';

const getArtistInfoAction = artistInfo =>({
    type: actionTypes.ARTIST_INFO,
    payload: artistInfo
})
export const getArtistInfoEffect = id => (dispatch) =>{
    request.get(artistInfoUrl(id)).then((data) => {
    dispatch(getArtistInfoAction(data))
  })
}
