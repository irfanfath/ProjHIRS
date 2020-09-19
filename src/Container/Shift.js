import React, { Component } from "react";
 
export default class Shift extends Component {
  // state={
  //   curTime : new Date().toLocaleString(),
  // }
  state = {
    time: new Date(),
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

  handleMove = () => {
      this.props.history.push("/checkin")
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
                                  </div>
                              </div>
                          </div>
                          <div className="about-column w-col w-col-7 w-col-stack">
                              <div className="form-block-2">
                                  <div className="w-form">
                                      <p className="section-title">Choose Your Shift</p>
                                      <div className="w-row">
                                          <div className="w-dyn-item w-col-mobile w-col-4">
                                              <div className="links-category w-inline-block">
                                                <div className="push_button blue" onClick={()=> this.handleMove(localStorage.setItem("shift", "1"))}>Shift 1</div>
                                              </div>
                                          </div>
                                          <div className="w-dyn-item w-col-mobile w-col-4">
                                              <div className="links-category w-inline-block">
                                                <div className="push_button blue" onClick={()=> this.handleMove(localStorage.setItem("shift", "2"))}>Shift 2</div>                                              
                                              </div>
                                          </div>
                                          <div className="w-dyn-item w-col-mobile w-col-4">
                                              <div className="links-category w-inline-block">
                                                <div className="push_button blue" onClick={()=> this.handleMove(localStorage.setItem("shift", "3"))}>Shift 3</div>                                              
                                              </div>
                                          </div>
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