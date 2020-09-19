import React, { Component } from "react";
 
class Home extends Component {
  // state={
  //   curTime : new Date().toLocaleString(),
  // }
  state = {
    time: new Date()
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
    this.props.history.push("/shift")
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
                                      <div className="w-row">
                                          <div className="w-dyn-item w-col-mobile-home w-col-6">
                                          <li>
                                              <div className="round green" onClick={()=> this.handleMove(localStorage.setItem("type", "WFO"))}> 
                                                <img src="https://img.icons8.com/dotty/64/000000/link-company-parent.png" alt="" />
                                                <div className="title-type">WFO</div>
                                              </div>
                                          </li>
                                          </div>
                                          <div className="w-dyn-item w-col-mobile-home w-col-6">
                                              <li>
                                                <div className="round green" onClick={()=> this.handleMove(localStorage.setItem("type", "WFH"))}> 
                                                <img src="https://img.icons8.com/wired/64/000000/work-from-home.png" alt ="" />
                                                  <div className="title-type">WFH</div>
                                                </div>
                                              </li>
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
 
export default Home;