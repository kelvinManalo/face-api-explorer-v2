import faceApi from "../apis/faceApi";
import {
    GET_PERSONGROUPS,
    CREATE_PERSONGROUP,
    UPDATE_PERSONGROUP,
    DELETE_PERSONGROUP,
    GET_PERSONGROUPPERSONS,
    CREATE_PERSONGROUPPERSON,
    UPDATE_PERSONGROUPPERSON,
    DELETE_PERSONGROUPPERSON,
    FACE_DETECT,
    FACE_IDENTIFY,
    GET_TRAININGSTATUS,
  } from "./types";


//Person Group
  export const fetchPersonGroups = () => async (dispatch) => {
    try {
      const response = await faceApi.get("/api/PersonGroup/Get");
      console.log(response);
      dispatch({ type: GET_PERSONGROUPS, payload: response.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOAD_ERROR" });
    }
  };

  export const createPersonGroup = (formValues) => async (dispatch) => {
    const responseAdd = await faceApi.put("/api/PersonGroup/Create", formValues);
    console.log(responseAdd);
    const response = await faceApi.get("/api/PersonGroup/Get");
    try {
      dispatch({ type: CREATE_PERSONGROUP, payload: response.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOAD_ERROR" });
    }
  };

  export const updatePersonGroup = (formValues) => async (dispatch) => {
    const responseEdit = await faceApi.patch("/api/PersonGroup/Update", formValues);
    console.log(responseEdit);
    const response = await faceApi.get("/api/PersonGroup/Get");
    try {
      dispatch({ type: UPDATE_PERSONGROUP, payload: response.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOAD_ERROR" });
    }
  };

  export const deletePersonGroup = (id) => async (dispatch) => {
    const responseDelete = await faceApi.delete(`/api/PersonGroup/Delete?personGroupId=${id}`);
    console.log(responseDelete);
    const response = await faceApi.get("/api/PersonGroup/Get");
    try {
      dispatch({ type: DELETE_PERSONGROUP, payload: response.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOAD_ERROR" });
    }
  };

//Face List
export const fetchPersonFace = () => async (dispatch) => {
  try {
    const response = await faceApi.get("/api/PersonGroup/Get");
    console.log(response);
    dispatch({ type: GET_PERSONGROUPS, payload: response.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOAD_ERROR" });
  }
};

export const createPersonFace = (groupId,personId,formValues) => async (dispatch) => {
  const responseAdd = await faceApi.post(`/api/PersonGroupPersonFace/Create/${groupId}/persons/${personId}`, formValues, { headers: { 'content-type': 'multipart/form-data' } })
  console.log(responseAdd);

  const response = await faceApi.get(`/api/PersonGroupPerson/Get/${groupId}`);
  try{
    dispatch({ type: GET_PERSONGROUPPERSONS, payload: response.data.data });
  }catch(error){
    console.log(error);
    dispatch({ type: "LOAD_ERROR" });
  }  
}

export const deletePersonFace = (groupId,personId,persistedFaceId) => async (dispatch) => {
  const responseDelete = await faceApi.delete(`/api/PersonGroupPersonFace/Delete/${groupId}/persons/${personId}/persistedFaces/${persistedFaceId}`);
  console.log(responseDelete);
  const response = await faceApi.get(`/api/PersonGroupPerson/Get/${groupId}`);
  try {
    dispatch({ type: GET_PERSONGROUPPERSONS, payload: response.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOAD_ERROR" });
  }
};

//Person Group Person
//Person Group
export const fetchPersonGroupPerson = (groupId) => async (dispatch) => {
  try {
    const response = await faceApi.get(`/api/PersonGroupPerson/Get/${groupId}`);
    console.log(response);
    dispatch({ type: GET_PERSONGROUPPERSONS, payload: response.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOAD_ERROR" });
  }
};

export const createPersonGroupPerson = (groupId,formValues) => async (dispatch) => {
  const responseAdd = await faceApi.post(`/api/PersonGroupPerson/Create/${groupId}`, formValues);
  console.log(responseAdd);
  const response = await faceApi.get(`/api/PersonGroupPerson/Get/${groupId}`);
  try {
    dispatch({ type: CREATE_PERSONGROUPPERSON, payload: response.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOAD_ERROR" });
  }
};

export const updatePersonGroupPerson = (groupId,personId,formValues) => async (dispatch) => {
  const responseEdit = await faceApi.patch(`/api/PersonGroupPerson/Update/${groupId}/${personId}`, formValues);
  console.log(responseEdit);
  const response = await faceApi.get(`/api/PersonGroupPerson/Get/${groupId}`);
  try {
    dispatch({ type: UPDATE_PERSONGROUPPERSON, payload: response.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOAD_ERROR" });
  }
};

export const deletePersonGroupPerson = (groupId,personId) => async (dispatch) => {
  const responseDelete = await faceApi.delete(`/api/PersonGroupPerson/Delete/${groupId}/${personId}`);
  console.log(responseDelete);
  const response = await faceApi.get(`/api/PersonGroupPerson/Get/${groupId}`);
  try {
    dispatch({ type: DELETE_PERSONGROUPPERSON, payload: response.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOAD_ERROR" });
  }
};

//Identify/Detect
export const detectPerson = (formValues) => async (dispatch) => {
  const responseDetect = await faceApi.post(`/api/Face/Detect`, formValues, { headers: { 'content-type': 'multipart/form-data' } });
  console.log(responseDetect);
  
  try {
    dispatch({ type: FACE_DETECT, payload: responseDetect.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: FACE_DETECT, payload: error.response.data.error });
  }
};

export const identifyPerson = (formValues) => async (dispatch) => {
  try {
  const responseIdentify = await faceApi.post(`/api/Face/Identify`, formValues);
  console.log(responseIdentify);

    if (responseIdentify.data.data[0].candidates.length > 0) {
      const responseGetPerson = await faceApi.get(`/api/PersonGroupPerson/GetById/${formValues.personGroupId}/${responseIdentify.data.data[0].candidates[0].personId}`);
      dispatch({ type: FACE_IDENTIFY, payload: [responseIdentify.data.data, responseGetPerson.data.data] });
    }else{
      dispatch({ type: FACE_IDENTIFY, payload: [responseIdentify.data.data] });
    }  
  } catch (error) {
    dispatch({ type: FACE_IDENTIFY, payload: [error.response.data.error] });
    // dispatch({ type: "LOAD_ERROR" });
  }
};

//training
export const getTrainingStatus = (groupId) => async (dispatch) => {
   try {        
    const response = await faceApi.get(`/api/PersonGroup/${groupId}/training`);
    dispatch({ type: GET_TRAININGSTATUS, payload: response.data.data });
    dispatch({ type: "LOAD_ERROR", payload: "" });
  } catch (error) {    
    console.log(error.response.data.error.Message);
    dispatch({ type: "LOAD_ERROR", payload: error.response.data.error.Message });
  }
};

export const trainPersonGroup = (personGroupId) => async (dispatch) => {
  const responseTrain = await faceApi.post(`/api/PersonGroup/${personGroupId}/train`, null);
  console.log(responseTrain);
  const response = await faceApi.get(`/api/PersonGroup/${personGroupId}/training`);
  console.log(response);
  try {
    dispatch({ type: GET_TRAININGSTATUS, payload: response.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOAD_ERROR" });
  }
};