import React, { Component } from 'react';
import InfoList from '@components/List';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

class SearchSong extends Component {
    constructor(props) {
        super(props);
        const { name } = this.props.match.params;
        this.state = {
            value: name,
        }
    }
    componentWillMount(){
        this.props.indexHandleChangeSong(this.state.value);
    }
    render() {
        // const { name } = this.props.match.params;
        const { song } = this.props.song
        return (
            <div>
            {song ?<InfoList tracks={song} isShowAr={true}/> : null}
            {console.log(this.props.song)
            }
            </div>
        )
    }
}
const mapState = (state) => ({
    song: state.song
});

const mapDispatch = (dispatch) => ({
    indexHandleChangeSong(value) {
        dispatch(actionCreators.handleSeachSong(value))
    }
});
export default connect(mapState, mapDispatch)(SearchSong);