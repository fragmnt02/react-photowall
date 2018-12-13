import React, { Component, Fragment } from "react";
import Webcam from "react-webcam";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import firebase from "firebase/app";
import "firebase/storage";

const SET_QUERY = gql`
  mutation($photo: String) {
    addPhoto(photo: $photo) {
      photos
    }
  }
`;

var config = {
  apiKey: "AIzaSyAcYtIXaSTezr2KZwBzWRd2g91_-SwXcmE",
  authDomain: "react-photowall-faa12.firebaseapp.com",
  databaseURL: "https://react-photowall-faa12.firebaseio.com",
  projectId: "react-photowall-faa12",
  storageBucket: "react-photowall-faa12.appspot.com",
  messagingSenderId: "61946813215"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const storage = firebase.storage();

class Nueva extends Component {

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
        var imageSrc = this.webcam.getScreenshot();
        imageSrc = imageSrc.replace(/^data:image\/[a-z]+;base64,/, "");
        var d= new Date();
        const name=btoa(d.toLocaleDateString()+d.toLocaleTimeString());
        const uploadTask=storage.ref(`pictures/${name}.jpg`).putString(imageSrc, 'base64', {contentType:'image/jpg'});
        uploadTask.on('state_changed',
        snapshot=>{},
        error=>{
            this.setState({mensaje:error.message});
        },
        ()=>{
            storage.ref('pictures').child(`${name}.jpg`).getDownloadURL().then(url=>{
              this.saveLink(url);
            });
        }
        );
  }

  saveLink=photo=>{
    this.props.addPhoto({
      variables:{
        photo
      }
    }).then(
      res=>{
        alert('exito');
      }
    );
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Fragment>
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <button onClick={this.capture}>Capture photo</button>
        </Fragment>
      </div>
    );
  }
}
export default graphql(SET_QUERY, { name: 'addPhoto' })(Nueva);
