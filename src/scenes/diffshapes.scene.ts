import { createPlaneMarker } from "../objects/PlaneMarker";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { handleXRHitTest } from "../utils/hitTest";

import {
  AmbientLight,
  BoxBufferGeometry,
  SphereGeometry,
  CylinderGeometry,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  XRFrame,
} from "three";

export function createDiffShapeScene(renderer: WebGLRenderer) {
  // TODO: Create a scene and build a WebXR app!
  const scene = new Scene();

  const camera = new PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.02,
    100
  );

  //add box
  const boxGeometry = new BoxBufferGeometry(3, 1, 1);
  const boxMaterial = new MeshBasicMaterial({ color: 0xff0000 });
  const box = new Mesh(boxGeometry, boxMaterial);
  box.position.z = -5;
  box.position.y = 2;
  box.position.x = -5;

  console.log("this is sphere", box);

  scene.add(box);

  const geometry = new SphereGeometry(1, 32, 16);
  const material = new MeshBasicMaterial({ color: 0xffff00 });
  const sphere = new Mesh(geometry, material);
  sphere.position.z = -3;
  console.log("this is sphere", sphere);
  scene.add(sphere);

  const sphere_geometry = new CylinderGeometry(1, 1, 5, 32);
  const sphere_material = new MeshBasicMaterial({ color: 0x42cf23 });
  const cylinder = new Mesh(sphere_geometry, sphere_material);
  cylinder.position.z = -9;
  cylinder.position.y = -4;
  cylinder.position.x = 5;

  scene.add(cylinder);

  const renderLoop = (timestamp: any, frame?: XRFrame) => {
    // box.rotation.y += 0.01;
    box.rotation.x += 0.1;

    if (renderer.xr.isPresenting) {
      renderer.render(scene, camera);
    }
  };

  renderer.setAnimationLoop(renderLoop);
}
