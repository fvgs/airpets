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
        const {socket} = this.props;
        const figures = [
            //{name: 'eggman', position: {x: 0, y: 0, z: 0}, scale: 0.01},
            //{name: 'untitled-scene', position: {x: 0, y: 0, z: 0}, scale: 0.01},
            //{name: 'flowey-the-flower', position: {x: 0, y: 0, z: 0}, scale: 0.01},
            //{name: 'brittany-is-a-bitch', position: {x: 0, y: 0, z: 0}, scale: 1},
            //{name: 'animal-1', position: {x: 0, y: 0, z: 0}, scale: 1}
        ];

        const nature = [
            //{name: 'mountain', position: {x: 0, y: 0, z: 0}, scale: 0.01},
            //{name: 'grass-plant', position: {x: 0, y: 0, z: 0}, scale: 0.1},
            //{name: 'coconut-tree', position: {x: 0, y: 0, z: 0}, scale: 0.001},
            //{name: 'tree-05', position: {x: 0, y: 0, z: 0}, scale: 0.01},
            //{name: 'tree-toon', position: {x: 0, y: 0, z: 0}, scale: 0.1},
            //{name: 'tree', position: {x: 0, y: 0, z: 0}, scale: 0.0001},
            //{name: 'tree-1-fixed-3', position: {x: 0, y: 0, z: 0}, scale: 0.01},
            //{name: 'rock', position: {x: 0, y: 0, z: 0}, scale: 0.01},
            //{name: 'candy-rocks', position: {x: 0, y: 0, z: 0}, scale: 0.1},
        ];

        const animals = [
            //{name: 'dragons-attack', position: {x: 0, y: 0, z: 0}, scale: 0.001},
            //{name: 'lion-cub', position: {x: 0, y: 0, z: 0}, scale: 0.05},
            //{name: 'zebra', position: {x: 0, y: 0, z: 0}, scale: 0.001},
            //{name: 'raven', position: {x: 0, y: 0, z: 0}, scale: 0.1},
            //{name: 'rabbit', position: {x: 0, y: 0, z: 0}, scale: 0.1},
            //{name: 'dog', position: {x: 0, y: 0, z: 0}, scale: 0.0001},
            //{name: 'giraffe', position: {x: 0, y: 0, z: 0}, scale: 0.01}
        ];

        const elements = figures.concat(nature).concat(animals);

        const items = [].concat(elements.map(({name}) =>
            [<a-asset-item id={name + '-obj'}
                           src={'/models/' + name + '-obj/' + name + '.obj'}/>,
                <a-asset-item id={name + '-mtl'}
                              src={'/models/' + name + '-obj/' + name + '.mtl'}/>]));
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
                <a-assets>
                    {items}
                </a-assets>
                {elements.map(({name, position, scale}) =>
                    <Entity obj-model={'obj: #' + name + '-obj; mtl: #' + name + '-mtl'}
                            position={position}
                            scale={[scale, scale, scale].join(" ")}
                            key={name}/>
                )}
                <a-marker-camera preset="hiro"/>
            </Scene>
        );
    }
}

export default Camera;
