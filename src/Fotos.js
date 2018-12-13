import React, { Component, Fragment } from 'react';
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

class Fotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            continuar:true
        }
    }

    componentDidMount() {
        this.escribirUltimo();
    }

    escribirUltimo=()=>{
        firebase.database().ref('react-photowall/').set({
            ultimo:2
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
    }

    mapImages=()=>{
        const { images }= this.state;
        return images.map(
            (image,index)=><img src={image} key={index}/>
        );
    }


    render() {
        return (
            <Fragment>
                <h1>FOTOS!!!!!</h1>
                <div>
                    {
                        this.mapImages()
                    }
                </div>
            </Fragment>
        );
    }
}
export default Fotos;