import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

class Item extends Component{
    setItemClass = (songInListId, SongId) =>
        (songInListId === SongId ? 'list-item active' : 'list-item')

    renderArtists = (artists) =>
        artists.map((artist)=>{
            return(
                <Link
                    key={artist.id}
                    to={{
                        pathname:`/artistinfo/${artist.id}`
                    }}
                >
                    {artist.name}
                </Link>
            )
        })
    playSong = () =>{
        const { songInList, index } = this.props;
        const flag = 'PLAY_SONG';
        this.props.changeSong({song: songInList, index, flag})
    }
    deleteSong = () =>{
        const { songInList } = this.props;
        this.props.deleteSong(songInList.id);
    }
    render(){
        const { songInList, song } = this.props;
        const { id, name } = songInList;
        const artists = songInList.ar || songInList.artists;
        return(
            <li key={id} className={this.setItemClass(id, song.id)}>
                <div className="name" onClick={this.playSong}>
                    {name}
                </div>
                <div className="artist">{this.renderArtists(artists)}</div>
                <Icon type="close" onClick={this.deleteSong}/>
            </li>
        )
    }
}
export default Item;
