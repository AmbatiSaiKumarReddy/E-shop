import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Row,Col} from 'react-bootstrap'
import { register} from '../actions/userActions' 
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FormContainer } from '../components/FormContainer'
import { Link } from 'react-router-dom'



const RegisterScreen = ({location,history}) => {
    const dispatch=useDispatch()
    const userLogin=useSelector(state=>state.userLogin)
    const {loading,error,userInfo}=userLogin
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setconfirmPassword]=useState('')
    const [message,setMessage]=useState('')
    const redirect=location.search?location.search.split("=")[1]:'/'

    const submitHandler=(e)=>{
        e.preventDefault()
        // DISPATCH
        if(password!==confirmPassword){
            setMessage('Passwords Do Not Match')
        }
        else{
            dispatch(register(name,email,password))
        }
       

   
    }

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }

    },[userInfo,history,redirect])
        

  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {error && <Message >{error}</Message>}
        {message && <Message >{message}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e)=>setName(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>
                    Email Address
                </Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>
                   Password
                </Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirm password'>
                <Form.Label>
                  Confirm Password
                </Form.Label>
                <Form.Control
                type='password'
                placeholder='confirm Password'
                value={confirmPassword}
                onChange={(e)=>setconfirmPassword(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Sign Up</Button>
        </Form>

        

        <Row className='py-3'>
            <Col>
            Already Registered
            <Link to={redirect?`/login?redirect=${redirect}`:'/login'}> Register</Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

export default RegisterScreen