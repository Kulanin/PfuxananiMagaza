
import React from 'react';
import Alert from 'react-bootstrap/Alert'
import './Form.css'
const { Form, Button } = require("react-bootstrap");


class StokvelForm extends React.Component {

    constructor(props) {

        super(props);

        this.lastnameRef = React.createRef();
        this.firstnameRef = React.createRef();
        this.date = React.createRef();
        this.amount = React.createRef();
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();

        this.state = {

            firstname: "",
            lastname: "",
            memberid: "",
            date: "",
            amount: "",
            cell: "",
            //below usued to manipulate form control background colors
            FirstnameBorderColor: "",
            LastnameBorderColor: "",
            DateBorderColor: "",
            AmountBorderColor: "",
            MemberIdBorderColor: "",
            //End of styled background colors
            SuccessPaymentMessage: "",
            ErrorPaymentMessage: "",
            m_disableSubmitBtn: false,


        }


        this.MemberRegistration = this.MemberRegistration.bind(this);
    }

    ValidateInputValues(p_InputValueObject) {

        if (this.props.buttonText === "Register Now") {

            if (p_InputValueObject.firstname === "") {

                console.log("Firstname cannot be empty")
               this.firstnameRef.current.focus();
                this.setState({
                    ErrorPaymentMessage: "Firstname cannot be empty! ",
                    FirstnameBorderColor: "red"
                   
                })

               

                return false;
            } else if (p_InputValueObject.lastname === "") {

                console.log("Lastname cannot be empty")
                this.lastnameRef.current.focus();
                this.setState({
                    ErrorPaymentMessage: "Lastname cannot be empty! ",
                    LastnameBorderColor:"red"
                })

                return false;
            }
        }


        if (this.props.buttonText === "Payment") {

            if (p_InputValueObject.date === "") {

                console.log("Date cannot be empty");
                this.date.current.focus();
                this.setState({
                    ErrorPaymentMessage: "Date cannot be empty! ",
                    DateBorderColor:"red"
                    
                })

                return false;

            }else if (p_InputValueObject.amount === "") {

                console.log("Amount cannot be empty");
                this.amount.current.focus();
                this.setState({
                    ErrorPaymentMessage: "Amount cannot be empty! ",
                    AmountBorderColor:"red",
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

            <Alert variant={p_Variant} style={{ "height": 45, "marginTop": -20 }} show={p_Show}>
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
                        ErrorPaymentMessage: "",
                        m_disableSubmitBtn: true,
                    })


                    setTimeout(() => {

                        window.location.reload(false);
                        
                        
                    }, 2000);

         

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

        this.setState({ [name]: value,
        
            FirstnameBorderColor:"",
            LastnameBorderColor:"",
            AmountBorderColor:"",
            DateBorderColor:"",
            ErrorPaymentMessage: ""
        })

    }

 



    render() {

        const classPaymentForm = {

            "display": this.props.dataset ? this.props.classPaymentForm : "block",
            "marginTop": 10,

        }

        const classRegisterForm = {

            "display": this.props.dataset ? this.props.classRegisterForm : "block",
            "marginTop": 10

        }

        //-----------------------------------------------------------------------
        const ClassFirstname = {

            "display": this.props.dataset ? this.props.classRegisterForm : "block",
            "marginTop": 10,

        }


            //-----------------------------------------------------------------------
            const classLogin = {

                "display": this.props.dataset ? this.props.classLogin : "block",
                "marginTop": 10,
    
            }
         //-----------------------------------------------------------------------
         const styleFirstname = {

            "display": this.props.dataset ? this.props.classRegisterForm : "block",
            "marginTop": 10,
            "borderColor":this.state.FirstnameBorderColor

        }


        const styleLastname = {

            "display": this.props.dataset ? this.props.classRegisterForm : "block",
            "marginTop": 10,
            "borderColor":this.state.LastnameBorderColor
            

        }

        const styleCell = {

            "display": this.props.dataset ? this.props.classRegisterForm : "block",
            "marginTop": 10

        }

        const styleDate = {

            "display": this.props.dataset ? this.props.classPaymentForm : "block",
            "marginTop": 10,
            "borderColor":this.state.DateBorderColor

        }

        const styleAmount = {

            "display": this.props.dataset ? this.props.classPaymentForm : "block",
            "marginTop": 10,
            "borderColor":this.state.AmountBorderColor
            

        }

        const styleMemberId = {

            "display": this.props.dataset ? this.props.classPaymentForm : "block",
            "marginTop": 10

        }

  

        console.log("KulanUniqueID" + this.props.uniqueMemberid)
        return (


            <Form className="classForm"   >
            
        <h2 style={{"textAlign":"center"}}>{this.state.ErrorPaymentMessage || this.state.SuccessPaymentMessage ? "": this.props.buttonText}</h2>
              <div>{this.AlertMessage(this.state.ErrorPaymentMessage ? this.state.ErrorPaymentMessage : this.state.SuccessPaymentMessage, this.state.ErrorPaymentMessage ? "danger" : "success", this.state.ErrorPaymentMessage || this.state.SuccessPaymentMessage ? true : false)}</div>  
                <Form.Group controlId="basicForm" style={{ "margin": 30 }} >

                    <Form.Label className={ClassFirstname} style={styleFirstname}  >Firstname</Form.Label>
                    <Form.Control className={ClassFirstname} style={styleFirstname} ref={this.firstnameRef} type="firstname" onChange={this.handleChange} placeholder="firstname" name="firstname"></Form.Control>
                    <Form.Label className={classLogin} style={classLogin}  >Username</Form.Label>
                    <Form.Control className={classLogin} style={classLogin} ref={this.usernameRef} type="username" onChange={this.handleChange} placeholder="username" name="username"></Form.Control>
                    <Form.Label className={classLogin} style={classLogin}  >Password</Form.Label>
                    <Form.Control className={classLogin} style={classLogin} ref={this.passwordRef} type="password" onChange={this.handleChange} placeholder="password" name="password"></Form.Control>

                    <Form.Label className={classRegisterForm} style={styleLastname}>Lastname</Form.Label>
                    <Form.Control className={classRegisterForm} ref={this.lastnameRef} style={styleLastname} type="lastname" onChange={this.handleChange} placeholder="lastname" name="lastname"></Form.Control>
                    <Form.Label className={classRegisterForm} style={styleCell}>Cell</Form.Label>
                    <Form.Control className={classRegisterForm} style={styleCell} type="cell" onChange={this.handleChange} placeholder="cell" name="cell"></Form.Control>
                    <Form.Label className={classPaymentForm} style={styleDate}  >Date</Form.Label>
                    <Form.Control className={classPaymentForm} ref={this.date} style={styleDate} type="date" onChange={this.handleChange} placeholder={new Date().toLocaleDateString()} name="date" ></Form.Control>
                    <Form.Label className={classPaymentForm}  style={styleAmount}  >Amount</Form.Label>
                    <Form.Control className={classPaymentForm} ref={this.amount} style={styleAmount} type="amount" onChange={this.handleChange} placeholder="R500.00" name="amount"></Form.Control>
                    <Form.Label className={classPaymentForm} style={styleMemberId}   >Amount ID</Form.Label>
                    <Form.Control className={classPaymentForm} style={styleMemberId} type="memberid" onChange={this.handleChange} disabled="disabled" value={this.props.uniqueMemberid} name="memberid"></Form.Control>

                    {/**   <Form.Text className="text-Muted">Just testing </Form.Text>*/}

                    <Button variant="primary" style={{ "marginRight": 15, "marginBottom": 50, "marginTop": 20 }}
                     onClick={(event) => this.MemberRegistration(event)}
                     disabled={this.state.m_disableSubmitBtn}
                     
                     >{this.props.buttonText}
                    
                     </Button>
                    <Button variant="primary" style={{ "marginBottom": 50, "marginTop": 20 }} onClick={(props) => {this.props.ToggleModalState(props,"Cancel")}}>Cancel</Button> <br />

                </Form.Group>

            </Form>
        )
    }
}


export default StokvelForm