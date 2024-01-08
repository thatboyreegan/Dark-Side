import { useContext } from "react";
import { Alert ,Button , Row, Col, Form , Stack} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const {
        loginUser,
        LoginError,
        updateLoginInfo,
        loginInfo,
        isLoginLoading} = useContext(AuthContext)
    return ( <>
        <Form onSubmit={loginUser}>
            <Row style={{height: '100vh', justifyContent: 'center', paddingTop: '10%'}}>
                <Col xs={6}>
                    <Stack gap={4}>
                        <h2>Log into your account</h2>
                        
                        <Form.Control type='email' placeholder="Email" onChange={(e) => updateLoginInfo({...loginInfo, email: e.target.value})}/>
                        <Form.Control type='password' placeholder="Password" onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value})}/>
                        <Button variant="primary" type="submit">{isLoginLoading? 'you will be in in a sec!': 'Login'}</Button>

                        {LoginError?.error && <Alert variant="danger">
                            <p>{LoginError?.message}</p>
                        </Alert>}
                    </Stack>
                </Col>
            </Row>
        </Form>
    </> );
}
 
export default Login;