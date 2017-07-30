import React, {Component} from 'react';
import 'aframe';
import {Entity, Scene} from 'aframe-react';
import {Vector3} from 'three';

const DURATION_MS = 20;

class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {attached: false};
    }

    componentWillMount() {
        const script = document.createElement("script");
        script.src = "https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js";
        script.async = true;
        document.body.appendChild(script);
    }

    render() {
      const {socket} = this.props

      return (
          <Scene arjs='sourceType: webcam;' events={{
              "child-attached": () => {
                  if (!this.state.attached && document.querySelector("a-scene").camera) {
                      setInterval(() => {
                          const worldPos = new Vector3();
                          worldPos.setFromMatrixPosition(document.querySelector("a-scene").camera.matrixWorld);
                          socket.emit('position update', worldPos)
                      }, DURATION_MS);
                      this.setState({attached: true});
                  }
              }
          }}>
              <Entity>
                  <a-animation attribute="rotation" easing="linear" dur="1000" to="0 360 0" repeat="indefinite"/>
                  <Entity id="spinner" gltf-model="url(/models/FidgetSpinner.gltf)" position={{x: 0, y: 0, z: 0}}
                          rotation="90 0 0" scale="0.25 0.25 0.25"/>
              </Entity>
              <a-marker-camera preset="hiro"/>
          </Scene>
      );
    }
}

export default Camera;
