
import React from 'react';
import Alert from 'react-bootstrap/Alert'
import './Form.css'
const { Form, Button } = require("react-bootstrap");


class StokvelForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            firstname: "",
            lastname: "",
            memberid: "",
            date: "",
            amount: "",
            cell: "",
            //classLastnameDisplay: "none",
            //classPaymentForm:"none",
            SuccessPaymentMessage: "",
            ErrorPaymentMessage: "",


        }


        this.MemberRegistration = this.MemberRegistration.bind(this);
    }

    ValidateInputValues(p_InputValueObject) {

        if (this.props.buttonText === "Register Now") {

            if (p_InputValueObject.firstname === "") {

                console.log("Firstname cannot be empty")
                this.setState({
                    ErrorPaymentMessage: "Firstname cannot be empty! "
                })

                return false;
            } else if (p_InputValueObject.lastname === "") {

                console.log("Lastname cannot be empty")

                this.setState({
                    ErrorPaymentMessage: "Lastname cannot be empty! "
                })

                return false;
            }
        }


        if (this.props.buttonText === "Submit") {

            if (p_InputValueObject.date === "") {

                console.log("Date cannot be empty")
                this.setState({
                    ErrorPaymentMessage: "Date cannot be empty! "
                })

                return false;

            }else if (p_InputValueObject.amount === "") {

                console.log("Date cannot be empty")
                this.setState({
                    ErrorPaymentMessage: "Amount cannot be empty! "
                })

                return false;

            }
        }


        this.setState({
            ErrorPaymentMessage: ""
        })


        return true;

    }

    //------------------------------------------------------------------
    //Define an aleart function 
    //------------------------------------------------------------------

    AlertMessage(p_Message, p_Variant, p_Show = false) {

        return (

            <Alert variant={p_Variant} style={{ "height": 50, "marginTop": -20 }} show={p_Show}>
                <p style={{ "textAlign": "center" }}>
                    {p_Message}
                </p>

            </Alert>

        )


    }

    async MemberRegistration(event) {

        let memberObject = {};
        let url = "";

        //memberObject.memberid = this.state.memberid;
        memberObject.memberid = this.props.uniqueMemberid;
        memberObject.firstname = this.state.firstname;
        memberObject.lastname = this.state.lastname;
        memberObject.cell = this.state.cell;
        memberObject.date = this.state.date;
        memberObject.amount = this.state.amount;

        if (this.ValidateInputValues(memberObject)) {

            let urlRegister = "http://127.0.0.1:5001/insert";
            let urlPayment = "http://127.0.0.1:5001/Payment";

            url = this.props.uniqueMemberid ? urlPayment : urlRegister;

            let requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({

                    member: memberObject,
                }),

            };

            try {
                let data = await fetch(url, requestOptions);
                let Response = await data.json();

                console.log(Response.data);

                if (Response.data) {
                    this.setState({

                        SuccessPaymentMessage: Response.data,
                        ErrorPaymentMessage: ""
                    })

                    return;
                }
                else if (Response.error) {
                    this.setState({

                        ErrorPaymentMessage: Response.error,
                        SuccessPaymentMessage: ""
                    })

                    return;
                }

            }
            catch (p_Error) {

                console.log("there was error " + p_Error)
            }


        }

        return false;
    }

    handleChange = (event) => {

        console.log(event.target.name);
        console.log(event.target.value)

        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value })

    }



    render() {

        const classPaymentForm = {

            "display": this.props.dataset ? this.props.classPaymentForm : "block",
            "marginTop": 10

        }

        const classRegisterForm = {

            "display": this.props.dataset ? this.props.classRegisterForm : "block",
            "marginTop": 10

        }

        console.log("KulanUniqueID" + this.props.uniqueMemberid)
        return (


            <Form className="classForm">

                {this.AlertMessage(this.state.ErrorPaymentMessage ? this.state.ErrorPaymentMessage : this.state.SuccessPaymentMessage, this.state.ErrorPaymentMessage ? "danger" : "success", this.state.ErrorPaymentMessage || this.state.SuccessPaymentMessage ? true : false)}
                <Form.Group controlId="basicForm" style={{ "margin": 30 }} >

                    <Form.Label className={classRegisterForm} style={classRegisterForm} required >Firstname</Form.Label>
                    <Form.Control className={classRegisterForm} style={classRegisterForm} type="firstname" onChange={this.handleChange} placeholder="firstname" name="firstname"></Form.Control>
                    <Form.Label className={classRegisterForm} style={classRegisterForm}>Lastname</Form.Label>
                    <Form.Control className={classRegisterForm} style={classRegisterForm} type="lastname" onChange={this.handleChange} placeholder="lastname" name="lastname"></Form.Control>
                    <Form.Label className={classRegisterForm} style={classRegisterForm}>Cell</Form.Label>
                    <Form.Control className={classRegisterForm} style={classRegisterForm} type="cell" onChange={this.handleChange} placeholder="cell" name="cell"></Form.Control>
                    <Form.Label className={classPaymentForm} style={classPaymentForm}  >Date</Form.Label>
                    <Form.Control className={classPaymentForm} style={classPaymentForm} type="date" onChange={this.handleChange} placeholder={new Date().toLocaleDateString()} name="date" ></Form.Control>
                    <Form.Label className={classPaymentForm} style={classPaymentForm}  >Amount</Form.Label>
                    <Form.Control className={classPaymentForm} style={classPaymentForm} type="amount" onChange={this.handleChange} placeholder="R500.00" name="amount"></Form.Control>
                    <Form.Label className={classPaymentForm} style={classPaymentForm}   >Member ID</Form.Label>
                    <Form.Control className={classPaymentForm} style={classPaymentForm} type="memberid" onChange={this.handleChange} disabled="disabled" value={this.props.uniqueMemberid} name="memberid"></Form.Control>

                    {/**   <Form.Text className="text-Muted">Just testing </Form.Text>*/}

                    <Button variant="primary" style={{ "marginRight": 15, "marginBottom": 50, "marginTop": 20 }} onClick={(event) => this.MemberRegistration(event)}>{this.props.buttonText}</Button>
                    <Button variant="primary" style={{ "marginBottom": 50, "marginTop": 20 }} onClick={() => { window.location.reload(false) }}>Cancel</Button> <br />

                </Form.Group>

            </Form>
        )
    }
}


export default StokvelForm