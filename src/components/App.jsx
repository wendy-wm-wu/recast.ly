import VideoList from './VideoList.js';
import exampleVideoData from '../data/exampleVideoData.js';
import VideoPlayer from './VideoPlayer.js';
import searchYouTube from '../searchYouTube.js';
import YOUTUBE_API_KEY from '../config/youtube.js';
import Search from './Search.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoList : [],
      playing: exampleVideoData[0]
    };

    this.titleClick = this.titleClick.bind(this);
    this.searchClick = _.debounce(this.searchClick.bind(this), 5000,  {'leading': true});
  }

  titleClick(video) {
    this.setState(state =>({
      playing: video
    }));

  }

  searchClick(query) {
    this.props.searchYouTube({
      key: YOUTUBE_API_KEY,
      query: query,
      max: 5,
    },
      (data) => {
        this.setState({
          playing: data[0],
          videoList: data
        })
      })
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search searchClick={this.searchClick} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div>
              <VideoPlayer video={this.state.playing} />
            </div>
          </div>
          <div className="col-md-5">
            <div><VideoList videos={this.state.videoList} titleClick={this.titleClick} /></div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
      this.props.searchYouTube({
      key: YOUTUBE_API_KEY,
      query: 'corgis',
      max: 5,
    },
      (data) => {
        this.setState({
          playing: data[0],
          videoList: data
        })
      })
    }

    // slower() {
    // _.debounce(this.searchClick, 5000, { 'leading' : true, 'trailing' : false});
    // }

    // this.setState( {
    //       playing: searchYouTube({
    //       max:5,
    //       query:'corgis',
    //       key:'AIzaSyD0IaJO6YGfHK7QAFPRLmwcsrdqPAzdFrg'})
    // });
    //call searchYouTube function
    //set state to data received
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
