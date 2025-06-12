import React, { useEffect, useState } from 'react'
import { CartState } from '../../Context/Context'
import { Button, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import Rating from '../Rating'
import { AiFillDelete } from 'react-icons/ai'

export const Cart = () => {
  const {state:{cart},dispatch} =CartState()
  const [total, settotle] = useState()
  useEffect(() => {
    settotle((cart.reduce((acc,cur)=> (acc+ Number(cur.price.split(".")[0])*cur.qty ),0)))
  }, [cart])
  
  return (
    <div className='home'>
 <div className='ProductContainer'>
  <ListGroup>
  {cart.map((pro)=> (
    <ListGroupItem key={pro.Id}>
      <Row >
       <Col md={2} >
       <Image src={pro.image} alt={pro.name} fluid rounded style={{width:"6rem" ,height:"5rem"}} />
       </Col>
       <Col md={2}>
       <span>{pro.name}</span>
       </Col>
       <Col md={2}>
       <span>${pro.price.split(".")[0]}</span>
       </Col>
       <Col md={2}>
       <Rating rating={pro.ratings}></Rating>
       </Col>
       <Col md={2}>
      <Form.Select as="select" value={pro.qty}
       onChange={(e)=> dispatch({
      type:"Change_Cart_Qty",
      payload:{
        id:pro.Id,
        qty:e.target.value
      },
     })}>
{[...Array(pro.inStock).keys()].map((x)=>(
  <option key={x+1}>{x+1}</option>
))}
      </Form.Select>
       </Col>
       <Col md={2}>
     <Button type='button' variant='light' onClick={()=> dispatch({
      type:"Remove_from_cart",
      payload:pro,
     })}>
  <AiFillDelete fontSize="20px"/>
     </Button>
       </Col>
      </Row>
    </ListGroupItem>

  ))} 
  </ListGroup>
 </div>
 <div className='filters summary'>
 <span className='title'> Summary {cart.length} Items
 </span>
 <span style={{fontWeight:700 ,fontSize: 20}}>Total: $ {total}</span>
 <Button type='button' disabled={cart.length==0}>Preceed to Chackout</Button>
 </div>
    </div>
  )
}
