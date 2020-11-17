
import React from 'react';
const { Form, Button } = require("react-bootstrap");


class StokvelForm extends React.Component {

    constructor(props) {

        super(props);


        this.MemberRegistration = this.MemberRegistration.bind(this);
    }


    MemberRegistration(event) {

        let memberObject = {};

        memberObject.memberId = "4";
        memberObject.firstname = "Fana";
        memberObject.lastname = "Chauke";

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


    render() {



        return (

            <Form>
                <Form.Group style={{ "width": 500, "height": 400, "border": "solid 1px black" }} controlId="basicForm">
                    <Form.Label>Member ID</Form.Label>
                    <Form.Control type="memberId" placeholder="Member Id"></Form.Control>
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control type="firstname" placeholder="Firstname"></Form.Control>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="lastname" placeholder="Lastname"></Form.Control>
                    {/**   <Form.Text className="text-Muted">Just testing </Form.Text>*/}
                    <Button variant="primary" onClick={(event) => this.MemberRegistration(event)}>Submit</Button>
                </Form.Group>

            </Form>
        )
    }
}


export default StokvelForm