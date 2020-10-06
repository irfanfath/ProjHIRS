import React, { Component } from "react";
import axios from "axios"
import moment from "moment"
 
export default class CheckIn extends Component {
  state = {
    employee_id: localStorage.getItem('profile'),
    time: new Date(),
    unixtime: moment(new Date()).unix(),
    timeunix: "1600587270",
    status: "check-in",
    latitude: localStorage.getItem('latitude'),
    longitude: localStorage.getItem('longitude'),
    ipAddress: "",
    type: localStorage.getItem('type'),
    showLoader: false
  };
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    const session = localStorage.getItem('session')
      if (session !== "active"){
        this.props.history.push("/login")
      }
    // ini buat convert unix to time
    // const timestamp = this.state.timeunix;
    // const date = new Date(timestamp*1000).toString("en-US"); ini buat format time
    // const date = new Date(timestamp*1000).toISOString("en-US"); ini buat format UTC
    // console.log(unixtime,date);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      time: new Date(),
    });
  }

  LoaderModal = () => {
    return (
        <div id="posisi-loader">
          <div className="title-loader">Please Wait...</div>
        </div>
    )
  }

  handleSubmit = () => {
    this.setState({
      showLoader: true
    })
    const payload = {
        "employee_id" : this.state.employee_id,
        "time" : this.state.time,
        "type" : this.state.type,
        "status" : this.state.status,
        "longitude" : this.state.longitude,
        "latitude" : this.state.latitude,
        "ipAddress" : this.state.ipAddress
    }
    const data = payload
    axios.post("https://api.airindonesia.co.id/attendances", data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).then((res) => {
        console.log(res)
        if(res.status === 201){
            localStorage.setItem("status", "checkin")
            alert(res.data.message)
            this.setState({showLoader: false})
            this.props.history.push("/")
        }else {
            alert("Check-In Gagal")
            this.setState({showLoader: false})
        }
    }).catch((err) => {
      console.log(err)
      alert("Check-In Gagal")
      this.setState({showLoader: false})
      }); 
}

  handleProfile = () => {
    this.props.history.push('/profile')
  }

  render() {
    const name = localStorage.getItem('Name')
    return (
      <div className="wrapper-pages">
          <div className="section gray">
              <div className="container w-container">
                  <div className="contact-div-wrapper">
                      <div className="columns-2 w-row">
                          <div className="about-column w-col w-col-5 w-col-stack">
                              <div className="map-wrapper">
                                <div className="title-profile" onClick={this.handleProfile}>My Profile
                                  <img src="https://img.icons8.com/ios-glyphs/32/000000/edit-user-male.png" alt="" />
                                </div>
                                  <h1 className="section-tittle">Hai, {name}</h1>
                                  <div className="section-time">
                                    <div>{this.state.time.toDateString()}</div>
                                    <div>{this.state.time.toLocaleTimeString()}</div>
                                  </div>
                              </div>
                          </div>
                          <div className="about-column w-col w-col-7 w-col-stack">
                              <div className="form-block-2">
                                  <div className="w-check">
                                      <div className="w-row">
                                      <label htmlFor="Contact-Message" className="field-label-2 contact-us-field gray">Notes:</label>
                                      <textarea id="Contact-Message" name="notes" placeholder="Your Activity" required="" className="contact-form message gray w-input"></textarea>
                                      <div className="center-button-block"><input type="submit" value="Check In" className="button-2 w-button" onClick={this.handleSubmit} /></div>
                                      {
                                        this.state.showLoader ? <this.LoaderModal /> : null
                                      }
                                  </div>
                              </div>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

    );
  }
}