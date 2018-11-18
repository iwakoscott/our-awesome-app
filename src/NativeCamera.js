import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { storage } from './utils/firebase';

class NativeCamera extends Component {
  state = {
    direction: true
  };

  handleTakePhoto = dataUri => {
    const uploadTask = storage
      .ref(`/photos`)
      .child(`image-${Date.now()}.jpg`)
      .putString(dataUri, `data_url`, { contentType: `image/jpg` });

    uploadTask.on('state_changed', null, null, () =>
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then(imageUrl => this.props.history.push('/analyze', { imageUrl }))
    );
  };

  toggleCamera = () =>
    this.setState(({ direction }) => ({ direction: !direction }));

  render() {
    return (
      <div>
        <Camera
          onTakePhoto={this.handleTakePhoto}
          idealFacingMode={this.state.direction ? 'environment' : 'user'}
        />
        <button onClick={this.toggleCamera}>
          {this.state.direction ? 'Selfie Mode' : 'Front Camera'}
        </button>
      </div>
    );
  }
}

export default NativeCamera;
