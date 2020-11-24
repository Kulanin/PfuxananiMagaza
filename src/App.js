import React from "react"
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Modal from 'react-modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import StokvelForm from "./components/Form"

import Phindile from "./images/Phindile.jpg"


//------------------------------------------------------------------------
//
//------------------------------------------------------------------------



//------------------------------------------------------------------------
//Form Modal for stokvel members
//------------------------------------------------------------------------

function FormModal(props) {

  return (
    <div>
      <Modal className="c_FormModal" isOpen={props.ModalState} >

        <StokvelForm  dataset={props.dataset} 
        classRegisterForm={props.classRegisterForm}  
        classPaymentForm = {props.classPaymentForm} />

      </Modal>
    </div>
  )
}


//------------------------------------------------------------------------
//Compoment which displays each member information 
//------------------------------------------------------------------------
function Members(props) {

  const members = props.members;
 
  return (

    
    <div className="c_members">


      {
        members.map((value, index) => {

          console.log(value.firstname);
          return <Card className="c_membersContainer" style={{ "width": "18rem" }}>
            <Card.Img variant="top" src={Phindile} ></Card.Img>
            <Card.Body>
              <Card.Title>{value.firstname} {value.lastname}</Card.Title>
              {/*<Card.Text id={index} >Cell : {value.cell}</Card.Text> */}
              <Card.Text id={index}>Total Contribution : {`R ${value.Total}`}</Card.Text>
            </Card.Body>
            <Button variant="primary" onClick={props.ToggleModalState}>Add Amount</Button>
          </Card >

        })

      }

    </div >
  )


}

//let users = ["Phindile", "Kulani", "Lulama"];
let g_MemberList = [];
let VariosState = {};


class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      display: false,
      name: "Kulani",
      ModalState: false,
      classPaymentForm: "none",
      classRegisterForm:"none",

      dataset: g_MemberList
    }

   

  }

  async FetchDataFromTheBackEnd() {

    let url = "http://127.0.0.1:5001/";

    let memberObject = {};
    memberObject.name = "Kulani";

    let requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },

    };

    try {

      let data = await fetch(url, requestOptions);
      let response = await data.json();
      if (response) {
        // console.log(JSON.stringify(response));
        response.recordset.map((data, index) => {
          console.log(data);
          this.MemberListArray(data);
        })

      }

    }
    catch (p_Reject) {

      console.log("There was error when fetching data" + p_Reject);
    }

  }


  componentDidMount = () => {

    console.log("Kulani Component did mount");
    this.FetchDataFromTheBackEnd();
  }


  ToggleModalState = (props,register = "") => {

    if(register){

      console.log("Kulani register : " + register);

      this.setState({
        ModalState: true,
        classRegisterForm: "block",
        classPaymentForm:"none",
  
      });

      return;
    }

    this.setState({
      ModalState: true,
      classPaymentForm:"block",
    

    });

  }

  MemberListArray(p_MemberList) {

    g_MemberList.push(p_MemberList);

    this.setState({

      dataset: g_MemberList
    })

    console.log(this.state.dataset)

  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <ul>
            <li><a href="#" onClick={(props)=>this.ToggleModalState(props,"Kulani")} >Register</a></li>
          </ul>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Pfuxanani Magaza Stokvel
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >

          </a>
        </header>


        <Members members={this.state.dataset} 
        ToggleModalState={this.ToggleModalState}
   
         />

        <FormModal ModalState={this.state.ModalState}
          dataset={this.state.dataset}
          classRegisterForm = {this.state.classRegisterForm}
          classPaymentForm = {this.state.classPaymentForm}
         />


      </div>
    );
  }

}

export default App;
