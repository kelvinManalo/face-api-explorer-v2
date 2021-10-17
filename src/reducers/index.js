import { combineReducers } from "redux";

import personGroupReducer from "./personGroupReducer";
import errorReducer from "./errorReducer";
import personGroupPersonsReducer from "./personGroupPersonsReducer";
import trainingStatusReducer from "./trainingStatusReducer";
import faceDetectReducer from "./faceDetectReducer";
import faceIdentifyReducer from "./faceIdentifyReducer";


export default combineReducers({
  personGroups: personGroupReducer,
  personGroupPersons: personGroupPersonsReducer,
  trainingStatus: trainingStatusReducer,
  faceDetect: faceDetectReducer,
  faceIdentify: faceIdentifyReducer,
  error: errorReducer,
});
