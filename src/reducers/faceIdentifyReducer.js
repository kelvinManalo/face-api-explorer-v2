import {
    FACE_IDENTIFY    
  } from "../actions/types";

  
  const faceDetectReducer = (state = [], action) => {
    switch (action.type) {
      case FACE_IDENTIFY:
          return action.payload      
      default:
        return state;
    }
  };
  
  export default faceDetectReducer;
  