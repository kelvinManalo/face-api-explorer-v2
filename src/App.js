import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


import PersonGroup from "./components/PersonGroup/PersonGroup";
import FaceIdentifyDetect from "./components/FaceIdentifyDetect/FaceIdentifyDetect";
import Home from "./components/Home/Home";
import PersonList from "./components/Person/PersonList";

const App = () => {

  return (
    <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/personGroup">Person Group</Link>
          </li>
          <li>
            <Link to="/faceIdentifyDetect">Identify / Detect</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/personGroup">
            <PersonGroup />
          </Route>
          <Route path="/faceIdentifyDetect">
            <FaceIdentifyDetect />
          </Route>
          <Route path={`/personGroup/:personGroupId`}>
             <PersonList />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
