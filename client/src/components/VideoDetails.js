import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class VideoDetails extends Component {
  constructor(props) {
    super();
    // console.log(props)
    this.state = {
      videoId: props.match.params.id,
      details: undefined
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/videos/${this.state.videoId}`)
      .then(r => r.json())
      .then(video => {
        console.log(video);
      });
  }

  render() {
    //console.log(this.props)
    const { videoId } = this.state;
    return (
      <div>
        Details of {videoId}
        <br />
        <br />
        <br />
        <button>
          <Link to="/">Back Home</Link>
        </button>
      </div>
    );
  }
}
