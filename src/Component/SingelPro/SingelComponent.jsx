import React from 'react'
import {  Button, Card} from 'react-bootstrap'
import Rating from "../Rating"
import { CartState } from '../../Context/Context'

export const SingelComponent = ({pro}) => {

  const{state:{cart},dispatch,} =CartState()
console.log(cart);

  return (<>
  <div className='products'>
    <Card style={{ height: '23rem' }}>
  <Card.Img variant='top' src={pro.image} alt={pro.name} className='image'/>
  <Card.Body>
    <Card.Title>
      {pro.name}
    </Card.Title>
    <Card.Subtitle style={{paddingBottom:10}}>
  <span>$ {pro.price.split('.')[0] } </span>
  {pro.fastDelivery? (
    <div>Fast Delivery</div>
  ):(
    <div>
      4 Days Delivrey
    </div>
  )}
  <Rating rating ={pro.ratings}/>
    </Card.Subtitle>
    <div style={{display:'flex' ,justifyContent:'space-between'}}>
      {cart.some((p)=> p.Id === pro.Id )?(
         <Button 
      onClick={()=> {
      dispatch({type:"Remove_from_cart",
        payload:pro,
      })}} variant='danger'> Remove The Cart </Button>):(  
    <Button onClick={()=> {
      dispatch({type:"Add_to_cart",
        payload:pro,
      })
    }} disabled={!pro.inStock}> {!pro.inStock ?'Out Of Stock' :'Add To Cart '} </Button>)}
   
      </div>
  </Card.Body>
      </Card>
    </div>

  </>

  )
}
