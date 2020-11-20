
import React from 'react';
import  './Form.css'
const { Form, Button } = require("react-bootstrap");


class StokvelForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            firstname : "",
            lastname : "",
            memberid: "",
            date: "",
            amount:"",
            classFirstnameDisplay: "none",
            classLastnameDisplay: "none"

        }


        this.MemberRegistration = this.MemberRegistration.bind(this);
    }


    MemberRegistration(event) {

        let memberObject = {};

        memberObject.memberid = this.state.memberid;
        memberObject.firstname = this.state.firstname;
        memberObject.lastname = this.state.lastname;

        let url = "http://127.0.0.1:5001/insert";

        let requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({

                member: memberObject,
            }),

        };

        fetch(url, requestOptions)
            .then(p_Response => { p_Response.json() })
            .then(p_ResponseJson => { console.log("rosolve json response" + JSON.stringify(p_ResponseJson)) })
            .catch(p_Error => { console.log(p_Error) });


    }

    handleChange = (event)=>{

        console.log(event.target.name);
        console.log(event.target.value)

        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]: value})

    }

  

    render() {

        const classFirstname = {

            "display": this.state.classFirstnameDisplay
        }

        const classLastname = {

            "display": this.state.classLastnameDisplay
        }
    

        return (

            <Form>
                <Form.Group style={{ "width": 500, "height": "auto", "border": "solid 1px black" }} controlId="basicForm">
                    
                    <Form.Label className= {classFirstname} style={classFirstname} >Firstname</Form.Label>
                    <Form.Control className={classFirstname} style={classFirstname} type="firstname" onChange={this.handleChange}  placeholder="firstname" name="firstname"></Form.Control>
                    <Form.Label className="classLastname" style={classLastname} >Lastname</Form.Label>
                    <Form.Control className="classLastname"style={classLastname} type="lastname" onChange={this.handleChange}  placeholder="lastname" name="lastname"></Form.Control>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" onChange={this.handleChange}  placeholder={new Date().toLocaleDateString()} name="date" ></Form.Control>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="amount" onChange={this.handleChange} placeholder="R500.00" name="amount"></Form.Control>
                    <Form.Label>Member ID</Form.Label>
                    <Form.Control type="memberid" onChange={this.handleChange}   placeholder="memberid"  name="memberid"></Form.Control>
      
                    {/**   <Form.Text className="text-Muted">Just testing </Form.Text>*/}
                   
                    <Button variant="primary" onClick={(event) => this.MemberRegistration(event)}>Submit</Button>
                    <Button variant="primary" style={{"marginLeft":10}} >Cancel</Button>
                   
                </Form.Group>

            </Form>
        )
    }
}


export default StokvelForm