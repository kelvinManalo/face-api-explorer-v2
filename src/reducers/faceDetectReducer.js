import {
    FACE_DETECT    
  } from "../actions/types";

  
  const faceDetectReducer = (state = [], action) => {
    switch (action.type) {
      case FACE_DETECT:
          return action.payload      
      default:
        return state;
    }
  };
  
  export default faceDetectReducer;
  