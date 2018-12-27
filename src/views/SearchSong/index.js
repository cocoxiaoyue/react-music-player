import React, { Component } from 'react';
// import InfoList from '@components/List';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

class SearchSong extends Component {
    constructor(props) {
        super(props);
        const { name } = this.props.match.params;
        this.state = {
            value: name
        }
    }
    componentDidMount() {
        this.props.indexHandleChangeSong(this.state.value);
        console.log(this.props.song);
    }
    render() {
        return (
            <div>123</div>
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