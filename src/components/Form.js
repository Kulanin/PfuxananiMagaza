
import React from 'react';
const { Form, Button } = require("react-bootstrap");

class StokvelForm extends React.Component {

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
                    <Button variant="primary">Submit</Button>
                </Form.Group>

            </Form>
        )
    }
}


export default StokvelForm