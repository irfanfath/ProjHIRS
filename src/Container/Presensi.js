import axios from "axios";
import React, { Component } from "react";
 
class Presensi extends Component {
  // state={
  //   curTime : new Date().toLocaleString(),
  // }
  constructor(props) {
    super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { //state is by default an object
        time: new Date(),
        dataAttendance: [],
    }
 }

//   state = {
//     time: new Date()
//   };
  componentDidMount() {
      const employeeId = localStorage.getItem('profile')
      this.handleGetAttendaceById(employeeId)

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

  handleGetAttendaceById = (employeeId) => {
      console.log(employeeId)
    axios.get('https://new-hris.irfanfath.site/attendances', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(response => {  
        // console.log(response.data)
      response.data.data.forEach(element => {
          if(element.employeeId === parseInt(employeeId)){
              this.setState({dataAttendance: [...this.state.dataAttendance, element]}, () => console.log(this.state.dataAttendance))
          }
      });
    });  
  }

  tick() {
    this.setState({
      time: new Date()
    });
  }

  renderTableData() {
    return this.state.dataAttendance.map((data, key) => {
       const { date, time, status } = data //destructuring
       const { shift_name } = data.shifts //destructuring
       return (
          <tr key={key}>
             {/* <td>{nik}</td> */}
             {/* <td>{name}</td> */}
             {/* <td>{position}</td> */}
             <td>{status}</td>
             <td>{date}</td>
             <td>{time}</td>
             {/* <td>{attendances_desc}</td> */}
             {/* <td>{type}</td> */}
             <td>{shift_name}</td>
             {/* <td>{shift_desc}</td> */}
          </tr>
       )
    })
 }

handleBack = () => {
    this.props.history.push('/')
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
                              <div className="form-block-2">
                                  <div className="w-form">
                                      <div className="w-row-presensi">
                                            <table id='students'>
                                                <tbody>
                                                    {this.renderTableData()}
                                                </tbody>
                                            </table>
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
 
export default Presensi;