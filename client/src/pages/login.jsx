import { Alert ,Button , Row, Col, Form , Stack} from "react-bootstrap";

const Login = () => {
    return ( <>
        <Form>
            <Row style={{height: '100vh', justifyContent: 'center', paddingTop: '10%'}}>
                <Col xs={6}>
                    <Stack gap={4}>
                        <h2>Log into your account</h2>
                        <Alert variant="danger">
                            <p>An error has occured during login</p>
                        </Alert>
                        <Form.Control type='email' placeholder="Email"/>
                        <Form.Control type='password' placeholder="Password"/>
                        <Button variant="primary" type="submit">login</Button>
                    </Stack>
                </Col>
            </Row>
        </Form>
    </> );
}
 
export default Login;