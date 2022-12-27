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

export function createHitTestScene(renderer: WebGLRenderer) {
  // TODO: Create a scene and build a WebXR app!
  const scene = new Scene();

  const camera = new PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.02,
    100
  );

  const ambientLight = new AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  const gltfLoader = new GLTFLoader();

  let koalaModel: Object3D;

  gltfLoader.load("../assets/models/koala.glb", (gltf: GLTF) => {
    koalaModel = gltf.scene.children[0];
  });

  const planeMarker = createPlaneMarker();
  scene.add(planeMarker);

  const controller = renderer.xr.getController(0);
  scene.add(controller);

  controller.addEventListener("select", onSelect);

  function onSelect() {
    if (planeMarker.visible) {
      const model = koalaModel.clone();

      model.position.setFromMatrixPosition(planeMarker.matrix);

      // Rotate the model randomly to give a bit of variation to the scene.
      model.rotation.y = Math.random() * (Math.PI * 2);
      model.visible = true;

      scene.add(model);
    }
  }

  // //add box
  // const boxGeometry = new BoxBufferGeometry(3, 1, 1);
  // const boxMaterial = new MeshBasicMaterial({ color: 0xff0000 });
  // const box = new Mesh(boxGeometry, boxMaterial);
  // box.position.z = -5;
  // box.position.y = 2;
  // box.position.x = -5;

  // console.log("this is sphere", box);

  // scene.add(box);

  // const geometry = new SphereGeometry(1, 32, 16);
  // const material = new MeshBasicMaterial({ color: 0xffff00 });
  // const sphere = new Mesh(geometry, material);
  // sphere.position.z = -3;
  // console.log("this is sphere", sphere);
  // scene.add(sphere);

  // const sphere_geometry = new CylinderGeometry(1, 1, 5, 32);
  // const sphere_material = new MeshBasicMaterial({ color: 0x42cf23 });
  // const cylinder = new Mesh(sphere_geometry, sphere_material);
  // cylinder.position.z = -9;
  // cylinder.position.y = -4;
  // cylinder.position.x = 5;

  // scene.add(cylinder);

  function onHitTestResultReady(hitPoseTransformed: Float32Array) {
    if (hitPoseTransformed) {
      planeMarker.visible = true;
      planeMarker.matrix.fromArray(hitPoseTransformed);
    }
  }

  function onHitTestResultEmpty() {
    planeMarker.visible = false;
  }

  const renderLoop = (timestamp: any, frame?: XRFrame) => {
    if (renderer.xr.isPresenting) {
      if (frame) {
        handleXRHitTest(
          renderer,
          frame,
          onHitTestResultReady,
          onHitTestResultEmpty
        );
      }

      renderer.render(scene, camera);
    }
  };

  //   if (renderer.xr.isPresenting) {
  //     renderer.render(scene, camera);
  //   }
  // };

  renderer.setAnimationLoop(renderLoop);
}
