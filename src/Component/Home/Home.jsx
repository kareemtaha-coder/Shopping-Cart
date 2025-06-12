import React from 'react'
import {CartState} from '../../Context/Context'
import {SingelComponent} from '../SingelPro/SingelComponent'
import '../SingelPro/style.css'
import {Filter} from "../Filter"
export const Home = () => {
  const {state :{product},ProductState: { inStock, fastDelivery, ratings, serchQuary,sort }} =CartState()
   

  const transformProduct=()=>{
    let SortedProducts=product;
    if(sort){
      SortedProducts=SortedProducts.sort((a,b)=>
      sort=== "lowToHigh" ? a.price - b.price: b.price - a.price);
    }
    if(!inStock){
      SortedProducts=SortedProducts.filter((prod)=> prod.inStock)
      console.log(SortedProducts);
      
    }
    if(fastDelivery){
      SortedProducts=SortedProducts.filter((prod)=> prod.    fastDelivery
      )
    }
    if(serchQuary){
      SortedProducts=SortedProducts.filter((prod)=> prod.name.toLowerCase().includes(serchQuary)
      )
    }
    if(ratings){
      SortedProducts=SortedProducts.filter((prod)=> prod.ratings>=ratings
      )
    }
    return SortedProducts
  }
  
  return (
    <div className ='home'>
    <Filter/>
  
     <div className ='ProductContainer'>
{transformProduct().map((pro)=>{
   return <SingelComponent pro={pro} key={pro.Id}/>


})}
    </div>
  </div>

  )
}
