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
            <Button variant="primary" onClick={props.displayForm}>Add Amount</Button>
          </Card >

        })


      }

    </div >
  )



}

let members = [
  { name: "Kulani", surname: "Ngobeni", image: "image1.jpg", cell: "071 445 8895", "contribution": 300 },
  { name: "Lulama", surname: "Ngobeni", image: "image2.jpg", cell: "079 888 2523", "contribution": 1000 },
  { name: "Phindile", surname: "Ngobeni", image: "image3.jpg", cell: "081 963 2252", "contribution": 500 },
  { name: "Arthur", surname: "Tivani", image: "image4.jpg", cell: "011 435 3358", "contribution": 700 },

];
//let users = ["Phindile", "Kulani", "Lulama"];
let MemberList = {};

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      display: false,
      name: "Kulani",
      ModalState: false,
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
      .then(p_JsonResolve => { console.log("Json resolve " + JSON.stringify(p_JsonResolve)) })
      .catch(p_Reject => console.log("There was an error " + p_Reject));



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


        <Members members={members} FormModal={this.FormModal} />

        <FormModal ModalState={this.state.ModalState} />


      </div>
    );
  }

}

export default App;
