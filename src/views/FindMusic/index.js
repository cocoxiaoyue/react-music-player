import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Tabs from '@components/Tabs';
import MinorTitle from '@components/MinorTitle';
import * as actionCreators from './store/actionCreators';
import PlayList from './PlayList';
import Explore from './Explore';
import './style.less';

const { TabPanel } = Tabs;
class FindMusic extends React.Component{
    componentDidMount() {
        const { swiperImg, cardList } = this.props.findMusic;
        if (!cardList.length && !swiperImg.length) {
            this.props.IndexFetchCardList();
            this.props.IndexFetchSwiperImg();
        }
    }
    render(){
        const { swiperImg, cardList } = this.props.findMusic;
        return(
            <div className="find-music">
                <MinorTitle>发现音乐</MinorTitle>
                <Tabs defaultActiveIndex={1}>
                    <TabPanel tab="个性推荐">
                        <Explore data={swiperImg} />
                    </TabPanel>
                    <TabPanel tab="歌单">
                        <PlayList data={cardList} />
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}
const mapState = (state) =>{
    return ({
        findMusic: state.findMusic,
    })
}
const mapDispath = (dispatch) =>({
    IndexFetchCardList(){
        dispatch(actionCreators.fetchCardList(30))
    },
    IndexFetchSwiperImg(){
        // dispatch(actionCreators.fetchSwiperImg())
    }
});
export default withRouter(connect(mapState,mapDispath)(FindMusic));
