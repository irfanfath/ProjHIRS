// import React from "react";
// import ReactDOM from "react-dom";
// import Main from "./Main";
// import "../src/Assets/Css/style.css"
// import "../src/Assets/Css/min.style.css"
 
// ReactDOM.render(
//   <Main/>, 
//   document.getElementById("root")
// );

import React from 'react';
import ReactDOM from 'react-dom';
import {geolocated} from 'react-geolocated';
import Geoloc from './Component/Location/Geoloc';
import { Route, HashRouter } from "react-router-dom";
import DynamicScrollToTop from "./Component/DynamicScrollToTop";
import Home from "./Container/Home";
import "../src/Assets/Css/style.css"
import "../src/Assets/Css/min.style.css"
import Shift from './Container/Shift';
import CheckIn from './Container/CheckIn';
import Login from './Container/Login';

class Main extends React.Component {
  render() {
    return (
      <div>
        {/* <p>{this.props.coords && this.props.coords.latitude}</p> */}
        <Geoloc {...this.props} />
        <HashRouter>
          <DynamicScrollToTop/>
              <Route exact path="/" component={Home}/>
              <Route path = "/shift" component={Shift}/>
              <Route path="/checkin" component={CheckIn}/>
              <Route path="/login" component={Login}/>
          </HashRouter>
      </div>
    );
  }
}

const MainWithGeoloc = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Main);

ReactDOM.render(<MainWithGeoloc />, document.getElementById('root'));
