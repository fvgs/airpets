import React, {Component} from 'react';
import 'aframe';
import {Entity, Scene} from 'aframe-react';
import {Vector3} from 'three';
import {Button} from "semantic-ui-react";

class Camera extends Component {
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
            <div>
                <Scene arjs='sourceType: webcam;'>
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
                <Button id="callButton" secondary size="big" style={{position: 'absolute'}}
                        onClick={() => {
                            if (document.querySelector("a-scene").camera) {
                                const worldPos = new Vector3();
                                worldPos.setFromMatrixPosition(document.querySelector("a-scene").camera.matrixWorld);
                                socket.emit('call', worldPos);
                            }
                        }}>
                    CALL
                </Button>
            </div>
        );
    }
}

export default Camera;
