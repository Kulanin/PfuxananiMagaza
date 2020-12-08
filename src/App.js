import React from "react"
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Modal from 'react-modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import StokvelForm from "./components/Form"
import Table from 'react-bootstrap/Table'



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

        <StokvelForm dataset={props.dataset}
          classRegisterForm={props.classRegisterForm}
          classPaymentForm={props.classPaymentForm}
          uniqueMemberid={props.uniqueMemberid}
          buttonText={props.buttonText}
          ModalState={props.ModalState}

        />

      </Modal>
    </div>
  )
}


function PaymentTable(props) {

  let rows = props.EachMember;
  let Total = 0;
  let length = "";

  if(rows){

    console.log("Length " + rows.amount.length);
    length =  rows.amount.length;

    for(let i = 0; i < length; i++){

        console.log("Total " + rows.amount[i]);
        Total += rows.amount[i];
  }

  }

  let columns = ["Fistname","Lastname","#","Date", "Amount"];

  return (

    <div className="PaymentHistory">


    <div>
    <Table striped bordered hover style={{ "display": props.displayTable, "width": "100%" }}>


      <thead>
        <tr >{columns.map((column, index) => {
          return <th>{column}</th>
        })}
        </tr>

      </thead>
      <tbody>


        <tr>
         
        <td>{props.EachMember.firstname}</td>
          <td>{props.EachMember.lastname}</td>

          <td>{rows.amount && rows.amount.map((value, index) => {

            return <div>{index}</div>

          })}
          </td>

    

          <td>{rows.date && rows.date.map((date, index) => {

            return <div>{date} </div>

          })}
          </td>



          <td style={{}}>{rows.amount && rows.amount.map((amount, index) => {

            return <div>{`R  ${amount}.00`}</div>

          })}
          </td>
         
          
        </tr>
        <tr>
          <th colSpan="4"  style={{"textAlign":"right"}}>Total</th>
          <td style={{"fontWeight":"bold"}}>{`R  ${Total}.00`}</td>
          </tr>
     
        
      </tbody>
    </Table>
    </div>
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

          let sum = 0;
          for (let i = 0; i < value.amount.length; i++) {

            sum += value.amount[i];
          }

          console.log(value.firstname);
          return <Card className="c_membersContainer" style={{ "width": "18rem", "cursor": "pointer" }}  >
            <Card.Img variant="top" src={`/images/${value.firstname}.jpg`} onClick={() => props.ToggleMemberTable(props, value)} ></Card.Img>
            <Card.Body>
              <Card.Title>{value.firstname} {value.lastname}</Card.Title>
              {/*<Card.Text id={index} >Cell : {value.cell}</Card.Text> */}
              <Card.Text id={index}>Total Contribution : {`R ${sum}.00`}</Card.Text>
            </Card.Body>
            <Button variant="primary" onClick={() => props.ToggleModalState(props, value._id)}>Add Amount</Button>
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
      classPaymentForm: "none",
      classRegisterForm: "none",
      buttonText: "",
      uniqueMemberid: "",
      displayTable: "none",
      EachMember: "",
      displayMembersDiv: "block",

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
        response.data.map((data, index) => {
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


  ToggleModalState = (props, p_Value = "") => {

    console.log("Kulani ToggleState passed value : " + p_Value);
    if (p_Value == "register") {

      this.setState({
        ModalState: true,
        classRegisterForm: "block",
        classPaymentForm: "none",
        buttonText: "Register Now",
        displayTable: "none"

      });

      return;
    }

    this.setState({
      ModalState: true,
      classPaymentForm: "block",
      uniqueMemberid: p_Value,
      buttonText: "Submit",
      displayTable: "none"


    });

  }

  ToggleMemberTable = (props, p_Member) => {


    this.setState({

      displayTable: !this.state.displayTable,
      EachMember: p_Member,
      displayMembersDiv: "none"

    });

  }

  MemberListArray(p_MemberList) {

    g_MemberList.push(p_MemberList);

    this.setState({

      dataset: g_MemberList
    })

    console.log(this.state.dataset)

  }

  //-------------------------------------------------------
  //Toggle Table

  ToggleTable() {

    this.setState({
      displayTable: "block",
    })

  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <ul>
            <li><a href="#" onClick={(props) => this.ToggleModalState(props, "register")} >Register</a></li>
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

      <div style={{"display":this.state.displayMembersDiv}}>
        <Members members={this.state.dataset}
          ToggleModalState={this.ToggleModalState}
          ToggleMemberTable={this.ToggleMemberTable}

        />
      </div>

        <FormModal ModalState={this.state.ModalState}
          dataset={this.state.dataset}
          classRegisterForm={this.state.classRegisterForm}
          classPaymentForm={this.state.classPaymentForm}
          uniqueMemberid={this.state.uniqueMemberid}
          buttonText={this.state.buttonText}
          ModalState={this.state.ModalState}
        />

        <PaymentTable displayTable={this.state.displayTable}

          EachMember={this.state.EachMember}

        />


      </div>
    );
  }

}

export default App;
