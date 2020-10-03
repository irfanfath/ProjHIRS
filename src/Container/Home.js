import React, { Component } from "react";
 
class Home extends Component {
  // state={
  //   curTime : new Date().toLocaleString(),
  // }
  state = {
    time: new Date(),
    showConfirm: false
  };
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    const session = localStorage.getItem('session')
    const status = localStorage.getItem('status')
      if (session !== "active"){
        this.props.history.push("/login")
      }
       else if (status === "checkin" )
        this.props.history.push ("/checkout")
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

  handleProfile = () => {
    this.props.history.push('/profile')
  }

  ConfirModal = () => {
    return (
      <div className="modal-show">
          <div className="modal-dialog modal-confirm">
              <div className="modal-content">
                  <div className="modal-header flex-column">
                      <h4 className="modal-title w-100">Are you sure?</h4>
                  </div>
                  <div className="modal-footer justify-content-center">
                      <button type="button" className="btn btn-secondary">No</button>
                      <button type="button" className="btn btn-danger">Yes</button>
                  </div>
              </div>
          </div>
      </div>  
    )
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
                                  <div className="w-form">
                                      <div className="w-row">
                                          <div className="w-dyn-item w-col-mobile-home w-col-6">
                                          <li>
                                              <div className="round red" onClick={()=> this.handleMove(localStorage.setItem("type", "WFO"))}> 
                                                <img src="https://img.icons8.com/dotty/64/000000/link-company-parent.png" alt="" />
                                                <div className="title-type">WFO</div>
                                              </div>
                                          </li>
                                          </div>
                                          <div className="w-dyn-item w-col-mobile-home w-col-6">
                                              <li>
                                                <div className="round red" onClick={()=> this.handleMove(localStorage.setItem("type", "WFH"))}> 
                                                <img src="https://img.icons8.com/wired/64/000000/work-from-home.png" alt ="" />
                                                  <div className="title-type">WFH</div>
                                                </div>
                                              </li>
                                          </div>
                                          {/* <div className="trigger-btn" onClick={()=> this.setState({showConfirm: true})}>Click to Open Confirm Modal</div> */}
                                          {
                                            this.state.showConfirm ? <this.ConfirModal /> : null
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
 
export default Home;