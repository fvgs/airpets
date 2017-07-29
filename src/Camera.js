import React, {Component} from 'react';
import 'aframe';
import {Entity, Scene} from 'aframe-react';

class Camera extends Component {
    componentWillMount() {
        const script = document.createElement("script");
        script.src = "https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js";
        script.async = true;
        document.body.appendChild(script);
    }

    render() {
        return (
            <Scene arjs="sourceType: webcam;">
                <Entity geometry={{primitive: 'box'}} material={{color: 'red'}} position={{x: 0, y: 0.5, z: 0}}/>
                <a-marker-camera preset="hiro"/>
            </Scene>
        );
    }
}

export default Camera;
