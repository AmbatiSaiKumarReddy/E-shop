import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import { CheckOutSteps } from '../components/CheckOutSteps'
import Message from '../components/Message'


export const PlaceOrderScreen = ({history}) => {

    const dispatch=useDispatch()
    
    const cart=useSelector(state=>state.cart)


    cart.itemsPrice=cart.cartItems.reduce((acc,item)=>acc+item.price * item.qty,0)
    cart.shippingPrice=cart.itemsPrice>100?0:100
    cart.taxPrice=Number((0.15*cart.itemsPrice).toFixed(2))
    cart.totalPrice=cart.itemsPrice+cart.shippingPrice+cart.taxPrice


    const orderCreate=useSelector(state=>state.orderCreate)
    const {order,success}=orderCreate

    console.log(success)
    useEffect(()=>{
        if(success){
            history.push(`/orders/${order._id}`)
        }
      
    },[history,success])



    const placeOrderHandler=()=>{

        
        
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice

        }))

   


        

    }
    
  return (
    <>
    <CheckOutSteps step1 step2 step3 step4/>
    <Row>
        <Col md={8}>
            <ListGroup>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address:</strong>
                        {cart.shippingAddress.address},
                        {cart.shippingAddress.postalCode},
                        {cart.shippingAddress.country}

                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method:</strong>
                        {cart.paymentMethod}
                        
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cart.cartItems.length===0?<Message variant='flush'>Your Cart is empty</Message>:
                    <ListGroup variant='flush'>
                     {cart.cartItems.map((item,index)=>
                     (
                         <ListGroup.Item key={index}>
                             <Row>
                                 <Col md={2}>
                                     <Image src={item.image} alt={item.name}
                                     fluid rounded/>
                                 </Col>
                                 <Col>
                                 <Link to={`/product/${item.product}`}>{item.name}</Link>
                                 </Col>
                                 <Col md={4}>
                                     {item.qty} * {item.price} =${item.qty*item.price}
                                 </Col>
                             </Row>

                         </ListGroup.Item>
                     ))}
                    </ListGroup>}
                    
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                        type='button'
                        className='btn-block'
                        disabled={cart.cartItems===0}
                        onClick={placeOrderHandler}>
                            Place Order
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
  )
}
