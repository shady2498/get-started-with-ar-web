import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { createHitTestScene } from "./scenes/hittest.scene";
import { createDiffShapeScene } from "./scenes/diffshapes.scene";
import {
  browserHasImmersiveArCompatibility,
  displayIntroductionMessage,
  displayUnsupportedBrowserMessage,
} from "./utils/domUtils";

import "./styles.css";

function initializeXRApp() {
  // Display a welcome message to the user.
  displayIntroductionMessage();
}

async function start() {
  // TODO: Check for WebXR AR support, and start the app if WebXR is supported.

  // Check if browser supports WebXR with "immersive-ar".
  const immersiveArSupported = await browserHasImmersiveArCompatibility();

  // Initialize app if supported.
  immersiveArSupported ? initializeXRApp() : displayUnsupportedBrowserMessage();
}

export async function displaySimpleShapes() {
  console.log("this is simple shapes");
  const { devicePixelRatio, innerHeight, innerWidth } = window;

  // Create a new WebGL renderer and set the size + pixel ratio.
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);

  // Enable XR functionality on the renderer.
  //because by default it is turned off
  renderer.xr.enabled = true;

  // Add it to the DOM. -- renderer being added to the dom
  document.body.appendChild(renderer.domElement);

  // Create the AR button element, configure our XR session, and append it to the DOM.
  document.body.appendChild(
    ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] })
  );

  // Pass the renderer to the createScene-funtion.
  createDiffShapeScene(renderer);
}

export function display3DModels() {
  console.log("this is 3D Models shapes", ARButton);

  console.log("this is simple shapes");
  const { devicePixelRatio, innerHeight, innerWidth } = window;

  // Create a new WebGL renderer and set the size + pixel ratio.
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);

  // Enable XR functionality on the renderer.
  //because by default it is turned off
  renderer.xr.enabled = true;

  // Add it to the DOM. -- renderer being added to the dom
  document.body.appendChild(renderer.domElement);

  // Create the AR button element, configure our XR session, and append it to the DOM.
  document.body.appendChild(
    ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] })
  );

  // Pass the renderer to the createScene-funtion.
  createHitTestScene(renderer);
}

start();
