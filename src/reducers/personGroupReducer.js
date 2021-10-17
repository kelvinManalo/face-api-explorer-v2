import {
    GET_PERSONGROUPS,
    CREATE_PERSONGROUP,
    UPDATE_PERSONGROUP,
    DELETE_PERSONGROUP,
    GET_TRAININGSTATUS,
    CREATE_TRAINING
  } from "../actions/types";

  
  const personGroupPersonReducer = (state = [], action) => {
    switch (action.type) {
      case GET_PERSONGROUPS:
          return action.payload
      case CREATE_PERSONGROUP:
        return action.payload       
      case UPDATE_PERSONGROUP:
        return action.payload
      case DELETE_PERSONGROUP:
        return action.payload
      case GET_TRAININGSTATUS:
      case CREATE_TRAINING:
        return state;
      default:
        return state;
    }
  };
  
  export default personGroupPersonReducer;
  