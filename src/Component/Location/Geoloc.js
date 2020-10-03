import React from 'react';
 
class Geoloc extends React.Component {  
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? 
          // <div>
          //   <div>latitude : {this.props.coords.latitude} </div>
          //   <div>longitude : {this.props.coords.longitude}</div>
          // </div>
            <div>
              {localStorage.setItem("latitude", this.props.coords.latitude,this.props.coords.longitude)}
              {localStorage.setItem("longitude", this.props.coords.longitude)}
            </div>
          : <div>Getting the location data&hellip; </div>;
  }
}
 
export default Geoloc;