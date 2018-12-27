import axios from 'axios';
import { CARD_LIST, SWIPER_IMG } from './actionTypes'
import { topPlaylist } from '../../../config/api'

export const getCardListAction = list =>({
    type: CARD_LIST,
    payload: { list }
})

export const fetchCardList = () => (dispatch) => {
    axios.get(topPlaylist(40)).then((res) =>{
    const { data } = res;
    if(data.code === 200) {
        dispatch(getCardListAction(data.playlists))
    }else {
        console.log(data.code);
        }
    })
}

export const getSwiperImgAction = (swiperImg) => ({
    type: SWIPER_IMG,
    payload: swiperImg
});

export const fetchSwiperImg = () => (dispatch) =>{
    axios.get("http://localhost:4000/banner").then((res) =>{
        const { data } = res;
        dispatch(getSwiperImgAction(data.banners))
    })
}
