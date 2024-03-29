import React, { Component } from "react";
import axios from "axios"

export default class Login extends Component{
    state = {
        time: new Date(),
        username: "",
        password: "",
        showLoader: false,
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

      LoaderModal = () => {
        return (
            <div id="posisi-loader">
              <div className="title-loader">Please Wait...</div>
            </div>
        )
      }

      handlePostLogin = (username, password) => {
        this.setState({
          showLoader: true
        })
        const data = {
          "username" : username,
          "password": password
        }
        axios.post('https://api.airindonesia.co.id/employees/login', data)
        .then((res) => {
            console.log(res)
          if(res.status === 200){
              localStorage.setItem("token", res.data.access_token)
              localStorage.setItem('session', "active");
              localStorage.setItem('profile', res.data.data.id);
              localStorage.setItem('Name', res.data.data.name);
              this.setState({token: res.data.access_token, showLoader: false})
              this.props.history.push("/")
          }else{
            alert("username atau password anda salah")
            this.setState({showLoader: false})
          }
        }).catch((err) => {
            console.log(err)
            alert("username atau password anda salah")
            this.setState({showLoader: false})
        });      
    }

    render(){
        return(
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
                                <div className="form-block-3">
                                    <div className="w-login">
                                        <div className="w-row">
                                            <div className="w-col w-col-6">
                                                <input type="text" id="username" name="username" placeholder="Username" required="" className="text-field-3 contact-form gray w-input" onChange={(e) => this.setState({username: e.target.value})}/>
                                            </div>
                                            <div className="w-clearfix w-col w-col-6">
                                                <input type="password" id="password" name="password" placeholder="Password" required="" className="text-field-3 contact-form gray w-input" onChange={(e) => this.setState({password: e.target.value})} />
                                            </div>
                                            <div className="center-button-block"><input type="submit" value="Login" className="button-2 w-button" onClick={() => this.handlePostLogin(this.state.username, this.state.password)} /></div>
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
        )
    }
}