// 歌手信息 参数：歌手id
export function artistInfoUrl(artistid) {
  return `http://musicApi/artists?id=${artistid}`
}

// 歌单详情 参数：歌单id
export function playlistInfoUrl(playlistid) {
  return `http://musicApi/playlist/detail?id=${playlistid}`
}

// 获取歌曲资源链接
export function Mp3Url(id) {
  return `https://api.imjad.cn/cloudmusic/?type=song&id=${id}`
}

// 获取歌词
export function lyricUrl(id) {
  return `http://musicApi/lyric?id=${id}`
}

// 精品歌单
export function topPlaylist(limit) {
  return `http://musicApi/top/playlist?limit=${limit}`
}

// 歌曲搜素
export function SeachSong(value) {
  return `http://musicApi/search?keywords=${value}`
}

// 轮播图
export const bannerUrl = '/api/banner'
