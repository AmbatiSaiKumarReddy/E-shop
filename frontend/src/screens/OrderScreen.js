import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import {PayPalButton} from 'react-paypal-button-v2'
import Loader from '../components/Loader'
import Message from '../components/Message'



export const OrderScreen = ({match}) => {

    const orderId=match.params.id

    const dispatch=useDispatch()
    const [sdkReady,setSdkReady]=useState(false)
    // const cart=useSelector(state=>state.cart)


    // cart.itemsPrice=cart.cartItems.reduce((acc,item)=>acc+item.price * item.qty,0)
    // cart.shippingPrice=cart.itemsPrice>100?0:100
    // cart.taxPrice=Number((0.15*cart.itemsPrice).toFixed(2))
    // cart.totalPrice=cart.itemsPrice+cart.shippingPrice+cart.taxPrice

    const orderDetails=useSelector(state=>state.orderDetails)
    const {order,error,loading}=orderDetails

    const orderPay=useSelector(state=>state.orderPay)
    const {loading:loadingPay,success:successPay}=orderPay
    console.log(sdkReady)
    

    useEffect(()=>{
            const addPayPalScript=async ()=>{
            const {data:clientId}=await axios.get('/api/config/paypal')
            const script=document.createElement('script')
            script.type='text/javascript'
            script.async=true
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
            script.onload=()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }


        if(!order || successPay){
            dispatch(getOrderDetails(orderId))
        }
        else if(!order.isPaid)
        {
            addPayPalScript()
        }
       
       },[dispatch,orderId,order,successPay])

    const successPaymentHandler=(paymentResult)=>{
    
    dispatch(payOrder(orderId,paymentResult))

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

                        {loadingPay && <Loader/>}
                        {!sdkReady ? <Loader/>: 
                        <PayPalButton currency='USD' amount={order.totalPrice}   onSuccess={successPaymentHandler}/>}
                        </ListGroup.Item>)
                }
                </ListGroup.Item>
                
            </ListGroup>
        </Card>
    </Col>
    </Row>
    
                 }
