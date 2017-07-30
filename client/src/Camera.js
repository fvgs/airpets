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
        const {socket, objects = []} = this.props;
        const items = [].concat(Object.values(objects).map(({name}) =>
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
                {Object.keys(objects).map(key => {
                        const {name, position, scale, rotation} = objects[key];
                        return <Entity obj-model={'obj: #' + name + '-obj; mtl: #' + name + '-mtl'}
                                       position={position}
                                       scale={[scale, scale, scale].join(" ")}
                                       key={key}
                                       rotation={[rotation.x, rotation.y, rotation.z].join(" ")}/>
                    }
                )}
                <a-marker-camera preset="hiro"/>
            </Scene>
        );
    }
}

export default Camera;
