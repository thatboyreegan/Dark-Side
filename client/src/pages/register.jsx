import { Alert ,Button , Row, Col, Form , Stack} from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Register = () => {
    const {registerInfo, updateRegisterInfo } = useContext(AuthContext)
    return ( <>
        <Form>
            <Row style={{height: '100vh', justifyContent: 'center', paddingTop: '10%'}}>
                <Col xs={6}>
                    <Stack gap={4}>
                        <h2>Register for an account</h2>
                        <Alert variant="danger">
                            <p>An error has occured</p>
                        </Alert>
                        <Form.Control type='text' placeholder="Name" onChange={(e) => updateRegisterInfo({...registerInfo, name: e.target.value})}/>
                        <Form.Control type='email' placeholder="Email" onChange={(e) => updateRegisterInfo({...registerInfo, email: e.target.value})}/>
                        <Form.Control type='password' placeholder="Password" onChange={(e) => updateRegisterInfo({...registerInfo, password: e.target.value})}/>
                        <Button variant="primary" type="submit">Register</Button>
                    </Stack>
                </Col>
            </Row>
        </Form>
    </> );
}
 
export default Register;