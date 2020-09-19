import React, { Component } from "react";
import axios from "axios"
 
export default class CheckIn extends Component {
  state = {
    time: new Date(),
    status: "check-in",
    geolocation: localStorage.getItem('latitude'),
    ipAddress: "192",
    shift: localStorage.getItem('shift'),
    type: localStorage.getItem('type')
  };
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      time: new Date()
    });
  }

  handleSubmit = () => {
    const payload = {
        "time" : this.state.time,
        "shift" : this.state.shift,
        "type" : this.state.type,
        "status" : this.state.status,
        "geolocation" : this.state.geolocation,
        "ipAddress" : this.state.ipAddress
    }
    const data = payload
    axios.post("https://hris.irfanfath.site/attendances", data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).then((res) => {
        console.log(res)
        if(res.status === 201){
            alert("berhasil menambahkan data")
        }else {
            alert("gagal menambahkan data")
        }
    })
}

  render() {
    return (
      <div className="wrapper-pages">
          <div className="section gray">
              <div className="container w-container">
                  <div className="contact-div-wrapper">
                      <div className="columns-2 w-row">
                          <div className="about-column w-col w-col-5 w-col-stack">
                              <div className="map-wrapper">
                                  <h1 className="section-tittle">Have a nice day!</h1>
                                  <div className="section-time">
                                    <div>{this.state.time.toDateString()}</div>
                                    <div>{this.state.time.toLocaleTimeString()}</div>
                                    <p>{this.state.shift}</p>
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