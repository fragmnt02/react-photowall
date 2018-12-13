import React, { Component, Fragment } from 'react';
import Webcam from "react-webcam";
import firebase from 'firebase/app';
import 'firebase/storage';
var config = {
    apiKey: "AIzaSyBuO1gZW65IzgsfxFJ5eh8lN2ChUFBsNpI",
    authDomain: "react-photowall.firebaseapp.com",
    databaseURL: "https://react-photowall.firebaseio.com",
    projectId: "react-photowall",
    storageBucket: "react-photowall.appspot.com",
    messagingSenderId: "657234793446"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
const storage=firebase.storage();



class Nueva extends Component {
    constructor(props){
        super(props);
        this.state={
            mensaje:'',
            percentage:0,
            ultima:0,
            continuar:true,
            proceder:false
        }
    }
    componentDidMount() {
        for (let index = 0; index < 1000; index++) {
            if(this.state.continuar) this.getImage(index);
        }
        this.setState({proceder:true});
    }

    getImage=image=>{
        storage.ref(`pictures/${image}.jpg`).getDownloadURL().then(
            url=>{
                var { images }= this.state;
                images.push(url);
                this.setState({images});
            }
        ).catch(err=>this.setState({continuar:false,ultima:image}));
    }
    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        if (!this.state.proceder) {
            alert('cargando...');
        } else {
            var imageSrc = this.webcam.getScreenshot();
        console.log(imageSrc)
        imageSrc=imageSrc.replace(/^data:image\/[a-z]+;base64,/, "");
        const uploadTask=storage.ref(`pictures/${this.state.ultima}.jpg`).putString(imageSrc, 'base64', {contentType:'image/jpg'});
        uploadTask.on('state_changed',
        snapshot=>{},
        error=>{
            this.setState({mensaje:error.message});
        },
        ()=>{
            storage.ref('pictures').child('1.jpg').getDownloadURL().then(url=>{alert('hecho');this.props.history.push('/nueva')});
        }
        );
        }
    };

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        };

        return (
            <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    this.state.proceder
                    ?
                    null
                    :
                    <h1>Cargando... Espere.</h1>
                }
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                />
                <button onClick={this.capture}>Capture photo</button>
            </div>
        );
    }
}
export default Nueva;