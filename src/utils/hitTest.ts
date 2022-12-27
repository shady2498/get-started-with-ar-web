import { WebGLRenderer, XRFrame, XRHitTestSource } from "three";

let hitTestSource: XRHitTestSource;
let hitTestSourceRequested = false;

export function handleXRHitTest(
  renderer: WebGLRenderer,
  frame: XRFrame,
  onHitTestResultReady: (hitPoseMatrix: Float32Array) => void,
  onHitTestResultEmpty: () => void
) {
  // reference space as the local coordinate system of the AR space
  const referenceSpace = renderer.xr.getReferenceSpace();
  //handy reference to the current running XR session
  const session = renderer.xr.getSession();

  let xrHitPoseMatrix: Float32Array | null | undefined;

  if (session && hitTestSourceRequested === false) {
    session.requestReferenceSpace("viewer").then((referenceSpace) => {
      if (session) {
        session
          .requestHitTestSource({ space: referenceSpace })
          .then((source) => {
            hitTestSource = source;
          });
      }
    });

    hitTestSourceRequested = true;
  }

  if (hitTestSource) {
    const hitTestResults = frame.getHitTestResults(hitTestSource);

    if (hitTestResults.length) {
      const hit = hitTestResults[0];

      if (hit && hit !== null && referenceSpace) {
        //return the position and orientation of the hit relative to the device
        const xrHitPose = hit.getPose(referenceSpace);

        if (xrHitPose) {
          xrHitPoseMatrix = xrHitPose.transform.matrix;
          onHitTestResultReady(xrHitPoseMatrix);
        }
      }
    } else {
      onHitTestResultEmpty();
    }
  }
}
