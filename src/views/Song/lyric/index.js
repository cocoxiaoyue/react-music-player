import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

const parseLyric = (lyricsStr) =>{
    // 将歌词切割成单行
    let lines = lyricsStr.split('\n');
    // 匹配歌词中的时间，匹配类型[xx:xx.xx]
    const pattern = /\[\d{2}:\d{2}.\d{1,3}\]/g ;
    // 保存最终结果的数组
    const result = [];
    // 去掉不含时间的行
    while(!pattern.test(lines[0])){
        lines = lines.splice(1);
    }
    // 上面用'\n'生成数组时，结果中最后一个元素为空，这里去掉
    if(!lines[lines.length - 1].length){lines.pop()}
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // 提取歌词，将时间清空，赶回一个新的字符串
        const value = line.replace(pattern, '');
        // 返回数组[时间]，对该数组做处理，将时间转为秒数，同时注意此类情况：多个时间点共享一句歌词，[时间1，时间2...]
        const times = line.match(pattern) || [];
        times.forEach((time) =>{
            // 去掉时间内的中括号得到xx:xx.xx 并用：分隔得到[xx,xx.xx]的数组
            const t = time.slice(1, -1).split(':');
            // 将结果压入最终的数组
            // 组合成 [时间,歌词]
            result.push([(parseInt(t[0], 10) * 60) + parseFloat(t[1]), value]);
            // 此处可能多个时间对应同一句歌词，而result.push显然会打乱顺序的，例如第一个时间点和最后一个时间点共享同一句歌词，而此时Push进去他们是相邻的，应按照时间顺序进行排序
        })
    }
    // 加上下标 是为了取出时间 result[0][0]与result[1][0]做比较而不是result[0]与result[1]做比较
    result.sort((a, b) => a[0] - b[0])
    return result
}
class LyricBlock extends Component{
    constructor(props){
        super(props);
        this.state={
            activeLines: [],
            top: 40
        }
    }
    componentWillReceiveProps(nextProps) {
        const { currentTime } = nextProps
        if (this.formatLyrics) {
            const len = this.formatLyrics.length
            for (let i = 0; i < len; i += 1) {
                if (currentTime > this.formatLyrics[i][0] - 1) {
                    this.setState(
                        {
                            activeLines: new Array(len)
                            .join()
                            .split('')
                            .map(() => 0),
                        },
                        () => {
                            const copyLines = this.state.activeLines.slice();
                            copyLines[i] = 1;
                            if(i < 8){
                                this.setState({
                                    top: 40
                                })
                            }
                            if(i > 8){
                                this.setState({
                                    top: 240 + (i * -29)
                                })
                            }
                            this.setState({
                                activeLines: [...copyLines]
                            })
                        },
                    )
                }
            }
        }
    }
    renderLyrics = (lyric) =>{
        if(!lyric) return null;
        if(lyric.nolyric || lyric.uncollected){
            return <p className="lyric-info">该歌曲暂无歌词o(╯□╰)o</p>
        }
        const lyricStr = lyric.lrc.lyric;
        this.formatLyrics = parseLyric(lyricStr);
        const { activeLines, top } = this.state;
        return(
            <ul
                style={{top: `${top}px`}}
                className="move-animate lyrics"
            >
            {this.formatLyrics.map((line, index) =>(
                <li
                    className={activeLines[index] === 1 ? 'line active' : 'line'}
                    key={line[0]}
                >
                    {line[1]}
                </li>
            ))}
            </ul>
        )
    }
    render(){
        const { lyric } = this.props;
        return (
            <div className="lyric-block">
                {lyric ? (
                    this.renderLyrics(lyric)
                ) : (
                    <p className="lyric-info">获取歌词中...</p>
                )}
            </div>
        )
    }
}

export default LyricBlock;

LyricBlock.protoTypes = {
  lyric: PropTypes.object,
  currentTime: PropTypes.number,
}
