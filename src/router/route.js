const routeInfo = [
  {
    path: '/playlistinfo/:id',
    view: 'Playlist',
  },
  {
    path: '/artistinfo/:id',
    view: 'Artist',
  },
  {
    path: '/exception/403',
    view: '403',
  },
  {
    path: '/exception/404',
    view: '404',
  },
  {
    path: '/lyric/:id',
    view: 'Song',
  },
  {
    path: '/search/:name',
    view: 'SearchSong',
  },
]

export default routeInfo;
