import React, { Component } from 'react';
import 'react-html5-camera-photo/build/css/index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NativeCamera from './NativeCamera';
import { app, GENERAL_MODEL } from './utils/clarifai';
import { BarChart } from 'react-d3-components';

class Analyze extends Component {
  state = {
    concepts: []
  };

  componentDidMount() {
    console.log('Analyzing...');
    app.models
      .initModel({
        id: GENERAL_MODEL,
        version: 'aa7f35c01e0642fda5cf400f543e7c40'
      })
      .then(generalModel => {
        return generalModel.predict(this.props.location.state.imageUrl);
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts'];
        console.log(concepts);
        this.setState({ concepts });
      });
  }

  render() {
    const { imageUrl } = this.props.location.state;
    const data = {
      label: 'Image Results',
      values: this.state.concepts.slice(0, 6).map(({ name, value }) => ({
        x: name,
        y: value
      }))
    };

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
        <img src={imageUrl} alt="taken by user" />
        {this.state.concepts.length === 0 ? (
          'Analyzing...'
        ) : (
          <BarChart
            data={data}
            width={500}
            height={500}
            margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
          />
        )}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={NativeCamera} />
            <Route path="/analyze" component={Analyze} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
