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
import "../src/Assets/Css/modal.css"
import "../src/Assets/Css/min.style.css"
import Shift from './Container/Shift';
import CheckIn from './Container/CheckIn';
import Login from './Container/Login';
import CheckOut from './Container/CheckOut';
import Profile from './Container/Profile';
import Presensi from './Container/Presensi';
import LoginAdmin from './Container/LoginAdmin';

class Main extends React.Component {
  render() {
    return (
      <div>
        {/* <p>{this.props.coords && this.props.coords.latitude}</p> */}
        <Geoloc {...this.props} />
        <HashRouter>
          <DynamicScrollToTop/>
              <Route exact path="/" component={Home}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/presensi" component={Presensi}/>
              <Route path="/shift" component={Shift}/>
              <Route path="/checkin" component={CheckIn}/>
              <Route path="/checkout" component={CheckOut}/>
              <Route path="/login" component={Login}/>
              <Route path="/loginadmin" component={LoginAdmin}/>
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
