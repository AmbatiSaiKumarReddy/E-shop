import React, {useEffect } from 'react'
import axios from 'axios'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'



export const OrderScreenTest = ({match}) => {

    const orderId=match.params.id

    const dispatch=useDispatch()
   
  
    // const cart=useSelector(state=>state.cart)


    // cart.itemsPrice=cart.cartItems.reduce((acc,item)=>acc+item.price * item.qty,0)
    // cart.shippingPrice=cart.itemsPrice>100?0:100
    // cart.taxPrice=Number((0.15*cart.itemsPrice).toFixed(2))
    // cart.totalPrice=cart.itemsPrice+cart.shippingPrice+cart.taxPrice

    const orderDetails=useSelector(state=>state.orderDetails)
    const {order,error,loading}=orderDetails

    const orderPay=useSelector(state=>state.orderPay)
    const {loading:loadingPay,success:successPay}=orderPay
    
    

    useEffect(()=>{
           

        
            dispatch(getOrderDetails(orderId))
       
       },[dispatch,orderId])

    const successPaymentHandler=()=>{
        const paymentResult={}
    
    dispatch(payOrder(orderId,paymentResult))

    }
    if(order){
        console.log(order.isPaid)
    }
    
    
  return loading ? <Loader/> : error? <Message variant='danger'>{error}</Message>:
    <Row>
    <Col md={8}>
        <ListGroup>
            <ListGroup.Item>
                <p>Order:{order._id}</p>
                <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address},
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}

                </p>

                
                {order.isDelivered && <Message>Delivered</Message>}
                {!order.isDelivered && <Message variant='danger'>Not Delivered</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method:</strong>
                    {order.paymentMethod}
                    
                </p>
                {order.isPaid && <Message>Paid</Message>}
                {!order.isPaid && <Message variant='danger'>Not Paid</Message>}

            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length===0?<Message variant='flush'>Your Cart is empty</Message>:
                <ListGroup variant='flush'>
                 {order.orderItems.map((item,index)=>
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
                        <Col>${order.itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Total</Col>
                        <Col> Rs {order.totalPrice}</Col>
                    </Row>
               
                </ListGroup.Item>
                <ListGroup.Item>
                {!order.isPaid &&
                    (<ListGroup.Item>

                        
                      <Button onClick={successPaymentHandler}>Pay</Button>
                        </ListGroup.Item>)
                }
                </ListGroup.Item>
                
            </ListGroup>
        </Card>
    </Col>
    </Row>
    
                 }
