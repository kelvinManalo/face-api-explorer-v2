import {
    GET_PERSONGROUPPERSONS,
    CREATE_PERSONGROUPPERSON,
    UPDATE_PERSONGROUPPERSON,
    DELETE_PERSONGROUPPERSON    
  } from "../actions/types";

  
  const personGroupReducer = (state = [], action) => {
    switch (action.type) {
      case GET_PERSONGROUPPERSONS:
          return action.payload
      case CREATE_PERSONGROUPPERSON:
        return action.payload       
      case UPDATE_PERSONGROUPPERSON:
        return action.payload
      case DELETE_PERSONGROUPPERSON:
        return action.payload
      default:
        return state;
    }
  };
  
  export default personGroupReducer;
  