import {    
    GET_TRAININGSTATUS,
    CREATE_TRAINING
  } from "../actions/types";

  
  const trainingStatusReducer = (state = [], action) => {
    switch (action.type) {      
      case GET_TRAININGSTATUS:
      case CREATE_TRAINING:
        return action.payload
      default:
        return state;
    }
  };
  
  export default trainingStatusReducer;
  