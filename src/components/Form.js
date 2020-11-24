
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
            //classLastnameDisplay: "none",
            //classPaymentForm:"none",
            SuccessPaymentMessage: "",
            ErrorPaymentMessage: "",


        }


        this.MemberRegistration = this.MemberRegistration.bind(this);
    }


   async MemberRegistration(event) {

        let memberObject = {};

        memberObject.memberid = this.state.memberid;
        memberObject.firstname = this.state.firstname;
        memberObject.lastname = this.state.lastname;
        memberObject.date = this.state.date;
        memberObject.amount = this.state.amount;

        //let url = "http://127.0.0.1:5001/insert";
        let url = "http://127.0.0.1:5001/Payment";

        let requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({

                member: memberObject,
            }),

        };

        try
        {
            let data = await fetch(url, requestOptions);
            let Response = await data.json();

            console.log(Response.data);

            if(Response.data)
            {
                this.setState({

                    SuccessPaymentMessage: Response.data,
                    ErrorPaymentMessage: ""
                })
    
                return;
            }
            else if(Response.error)
            {
                this.setState({

                    ErrorPaymentMessage: Response.error,
                    SuccessPaymentMessage: ""
                })

                return;
            }

            
         
           

        }
        catch(p_Error){

            console.log("there was error " + p_Error)
        }
      

          


    }

    handleChange = (event)=>{

        console.log(event.target.name);
        console.log(event.target.value)

        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]: value})

    }

  

    render() {
      
        const classPaymentForm = {

            "display": this.props.dataset ? this.props.classPaymentForm  : "block" 
        }

        const classRegisterForm = {

            "display": this.props.dataset ? this.props.classRegisterForm :  "block" 
        }
    
        //console.log("Kulani1111" + this.props.dataset)
        return (
            

            <Form>
                <Form.Group style={{ "width": 500, "height": "auto", "border": "solid 1px black" }} controlId="basicForm">
                    
                    <Form.Label className= {classRegisterForm} style={classRegisterForm} >Firstname</Form.Label>
                    <Form.Control className={classRegisterForm} style={classRegisterForm} type="firstname" onChange={this.handleChange}  placeholder="firstname" name="firstname"></Form.Control>
                    <Form.Label className={classRegisterForm} style={classRegisterForm}>Lastname</Form.Label>
                    <Form.Control className={classRegisterForm} style={classRegisterForm} type="lastname" onChange={this.handleChange}  placeholder="lastname" name="lastname"></Form.Control>
                    <Form.Label className= {classPaymentForm} style={classPaymentForm}  >Date</Form.Label>
                    <Form.Control className= {classPaymentForm} style={classPaymentForm}   type="date" onChange={this.handleChange}  placeholder={new Date().toLocaleDateString()} name="date" ></Form.Control>
                    <Form.Label className= {classPaymentForm} style={classPaymentForm}   >Amount</Form.Label>
                    <Form.Control  className= {classPaymentForm} style={classPaymentForm}  type="amount" onChange={this.handleChange} placeholder="R500.00" name="amount"></Form.Control>
                    <Form.Label className= {classPaymentForm} style={classPaymentForm}   >Member ID</Form.Label>
                    <Form.Control className= {classPaymentForm} style={classPaymentForm}   type="memberid" onChange={this.handleChange}   placeholder="memberid"  name="memberid"></Form.Control>
      
                    {/**   <Form.Text className="text-Muted">Just testing </Form.Text>*/}
                   
                    <Button variant="primary" style={{"marginLeft":10, "marginBottom":50,"marginTop":20}}  onClick={(event) => this.MemberRegistration(event)}>Submit</Button>
                    <Button variant="primary" style={{"marginLeft":10, "marginBottom":50,"marginTop":20}} onClick={()=> {window.location.reload(false)}}>Cancel</Button> <br />
                    <Form.Label  style={{"color":"green"}} >{this.state.SuccessPaymentMessage}</Form.Label>
                    <Form.Label  style={{"color":"red"}} >{this.state.ErrorPaymentMessage}</Form.Label>
                   
                </Form.Group>

            </Form>
        )
    }
}


export default StokvelForm