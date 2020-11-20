import React from "react"
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Modal from 'react-modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import StokvelForm from "./components/Form"

import firstImage from "./images/image1.jpg"


//------------------------------------------------------------------------
//Display Members form
//------------------------------------------------------------------------



//------------------------------------------------------------------------
//Form Modal for stokvel members
//------------------------------------------------------------------------

function FormModal(props) {


  return (
    <div>
      <Modal className="c_FormModal" isOpen={props.ModalState}>

        <StokvelForm />

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
          return <Card className="c_membersContainer" style={{ "width": "18rem" }}>
            <Card.Img variant="top" src={firstImage} ></Card.Img>
            <Card.Body>
              <Card.Title>{value.name} {value.surname}</Card.Title>
              <Card.Text id={index} >Cell : {value.cell}</Card.Text>
              <Card.Text id={index}>Total Contribution : {`R ${value.contribution}`}</Card.Text>
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

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      display: false,
      name: "Kulani",
      ModalState: false,
      dataset: g_MemberList
    }

    this.DisplayForm = this.DisplayForm.bind(this)

  }

  

  FetchDataFromTheBackEnd = () => {

    let url = "http://127.0.0.1:5001/";

    let memberObject = {};
    memberObject.name = "Kulani";

    let requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },


    };

    fetch(url, requestOptions)
      .then(p_Resolve => p_Resolve.json())
      .then(p_JsonResolve => p_JsonResolve.map((data,index)=>{

        console.log(data,index)

        this.MemberListArray(data);


      }))
      .catch(p_Reject => console.log("There was an error " + p_Reject))



  }


  componentDidMount = () => {

    console.log("Kulani Component did mount");
    this.FetchDataFromTheBackEnd();
  }







  DisplayForm() {

    console.log("I have been clicked")
    return (

      <StokvelForm />
    )
  }

  ToggleModalState = ()=>{

    this.setState({
      ModalState: true,
  });

  }

  MemberListArray(p_MemberList){

    g_MemberList.push(p_MemberList);

    this.setState({

      dataset: g_MemberList
    })

  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
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


        <Members members={this.state.dataset} ToggleModalState={this.ToggleModalState} />

        <FormModal ModalState={this.state.ModalState} />


      </div>
    );
  }

}

export default App;
