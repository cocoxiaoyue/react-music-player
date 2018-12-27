import * as actionTypes from './actionTypes';

const song = {
  name: 'だんご大家族',
  id: 760533,
  pst: 0,
  t: 0,
  artists: [
    {
      id: 17601,
      name: '茶太',
      tns: [],
      alias: [],
    },
  ],
  alia: [],
  pop: 100,
  st: 0,
  rt: '',
  fee: 0,
  v: 51,
  crbt: null,
  cf: '',
  album: {
    id: 760533,
    name: 'メグメル/だんご大家族',
    picUrl: 'https://p1.music.126.net/jNhg3v8ayCzL_k470qQyvQ==/3424978721550752.jpg',
    tns: [],
    pic_str: '18225504742452490',
    pic: 3424978721550752,
  },
  dt: 273000,
  h: null,
  m: {
    br: 192000,
    fid: 0,
    size: 6553434,
    vd: -2,
  },
  l: {
    br: 90000,
    fid: 0,
    size: 6553434,
    vd: -2,
  },
  a: null,
  cd: '1',
  no: 18,
  rtUrl: null,
  ftype: 0,
  rtUrls: [],
  djId: 0,
  copyright: 2,
  s_id: 0,
  mst: 9,
  cp: 0,
  mv: 0,
  rtype: 0,
  rurl: null,
  publishTime: 1193328000000,
  url: 'https://music.163.com/song/media/outer/url?id=760533.mp3',
}

const initState = {
  playlist: [song],
  song,
  index: 0,
  flag: '',
  currentTime: 0,
  isPlaying: false,
  starredList: [],
}

export default (state = initState, action) =>{
    let delIndex;
    const stateTemp = JSON.parse(JSON.stringify(state));
    const { playlist } = stateTemp;
    const len = playlist.length;
    switch (action.type) {
        case actionTypes.INIT_STARRED_LIST:
            return { ...state, starredList: [...action.payload] }
        case actionTypes.PLAYER_UPDATE_STATUS:
            return {
                ...state,
                ...action.payload
            }
        case actionTypes.PLAYER_DELETE_SONG:
            for (var i = 0; i < len ;i++) {
                if(playlist[i].id === action.payload){
                    delIndex = i;
                }
            }
            playlist.splice(delIndex, 1)
            return {
                ...state,
                playlist,
                // 删除歌曲后记得改变当前播放歌曲的index
                index: state.index ? state.index - 1 : state.playlist.length - 1
            }
        case actionTypes.PLAYER_PLAY_SONG:
            return {
                ...state,
                playlist: [action.payload, ...state.playlist],
                song: action.payload,
                index: 0,
                flag: actionTypes.PLAYER_PLAY_SONG
            }
        case actionTypes.PLAYER_ADD_SONG:
            return {
                ...state,
                playlist: [action.payload, ...state.playlist],
                flag: actionTypes.PLAYER_PLAY_SONG
            }
        case actionTypes.PLAYER_CHANGE_SONG:
            return {
                ...state,
                song: action.payload.song,
                index: action.payload.index,
                flag: action.payload.flag
            }
        default:
            return state;
    }
}
