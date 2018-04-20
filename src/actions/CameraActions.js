import { CAMERA_START, CAMERA_CLOSE } from './types';

export function cameraStartAction(){
  return { type: CAMERA_START };
}

export function cameraCloseAction(){
  return { type: CAMERA_CLOSE };
}
