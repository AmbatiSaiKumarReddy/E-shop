import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {getUserDetails, updateUserProfile} from '../actions/userActions' 
import Message from '../components/Message'
import Loader from '../components/Loader'






const ProfileScreen = ({location,history}) => {
    const dispatch=useDispatch()
    const userDetails=useSelector(state=>state.userDetails)
    const {loading,error,user}=userDetails
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setconfirmPassword]=useState('')
    const [message,setMessage]=useState('')
    const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
    const {success}=userUpdateProfile


    const submitHandler=(e)=>{
        e.preventDefault()
        // DISPATCH
        if(password!==confirmPassword){
            setMessage('Passwords Do Not Match')
        }
        else{
            //DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile({name,email,password}))
        }
       

   
    }

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
        else {
            if(!user.name){
                console.log("x..")
                dispatch(getUserDetails())

            }
            else{
                console.log("y..")
                setName(user.name)
                setEmail(user.email)
            }
        }

    },[userInfo,history,dispatch,user])
        

  return <Row>
      <Col md={3}>
        <h2>User Profile</h2>
            {error && <Message >{error}</Message>}
            {message && <Message >{message}</Message>}
            {success && <Message >Profile Updated</Message>}
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

                <Button type='submit' variant='primary'>Update</Button>
        </Form>
      </Col>
      <Col md={9}>
          <h2>My Orders</h2>
      </Col>
  </Row>
}

export default ProfileScreen