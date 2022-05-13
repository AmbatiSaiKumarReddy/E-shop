import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import { useSelector,useDispatch } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import { CheckOutSteps } from '../components/CheckOutSteps'

export const ShippingScreen = ({history}) => {
    const dispatch=useDispatch()

    const cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart


    const [address,setAddress]=useState(shippingAddress.address)
    const [city,setCity]=useState(shippingAddress.city)
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const [country,setCountry]=useState(shippingAddress.country)

    const submitHandler=()=>{
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }
  return (
    <FormContainer>
        <CheckOutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>address</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address}
                required
                onChange={(e)=>setAddress(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>city</Form.Label>
                <Form.Control
                type='text'
                required
                placeholder='Enter city'
                value={city}
                onChange={(e)=>setCity(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label>postalCode</Form.Label>
                <Form.Control
                type='text'
                required
                placeholder='Enter postalCode'
                value={postalCode}
                onChange={(e)=>setPostalCode(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>country</Form.Label>
                <Form.Control
                type='text'
                required
                placeholder='Enter country'
                value={country}
                onChange={(e)=>setCountry(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}
