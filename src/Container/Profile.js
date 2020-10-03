import React, { Component } from "react";
import axios from "axios"
 
class Profile extends Component {
  // state={
  //   curTime : new Date().toLocaleString(),
  // }
  state = {
    time: new Date(),
    password: "",
    showLoader: false,
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
      this.props.history.push('/presensi')
  }

  handleBack = () => {
      this.props.history.push('/')
  }

  handleUpdate = () => {
    this.setState({
      showLoader: true
    })
    const data = {
        "password" : this.state.password
    }
    let id = localStorage.getItem("profile")
    axios.put(`https://new-hris.irfanfath.site/employees/${id}`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
        }
    }).then((res) => {
        console.log(res)
        if(res.status === 200){
            alert("Berhasil merubah data")
            this.setState({showLoader: false})
            this.props.history.push('/')
        }else {
            alert("Gagal merubah data")
            this.setState({showLoader: false})
        }
    })
  }

  LoaderModal = () => {
    return (
        <div id="posisi-loader">
          <div className="title-loader">Please Wait...</div>
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
                                <div className="title-profile" onClick={this.handleBack}>Back To Home &nbsp;
                                    <img src="https://img.icons8.com/fluent-systems-filled/24/000000/home.png" alt="" />
                                </div>
                                  <h1 className="section-tittle">Hai, {name}</h1>
                                  <div className="section-time">
                                    <div>{this.state.time.toDateString()}</div>
                                    <div>{this.state.time.toLocaleTimeString()}</div>
                                  </div>
                              </div>
                          </div>
                          <div className="about-column w-col w-col-7 w-col-stack">
                              <div className="form-block-3">
                              <button className="button-2 contact w-button" onClick={this.handleMove}>Data Presensi</button>
                                  <div className="w-form">
                                      <div className="w-row">
                                        <div className="title-gantipass">Ganti Password</div>
                                            <input type="text" name="Contact-Name" placeholder="New Password" className="text-field-3 contact-form gray w-input" onChange={(e) => this.setState({password: e.target.value})}/>
                                          <div className="center-button-block"><input type="submit" value="Submit" className="button-2 w-button" onClick={() => this.handleUpdate(this.state.password)} /></div>
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
 
export default Profile;