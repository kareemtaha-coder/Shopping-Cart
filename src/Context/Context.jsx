import { faker } from '@faker-js/faker'
import React, { createContext, useReducer ,useContext} from 'react'
import { CartReducer, ProductReducer } from './Reducer'

 const Cart =createContext()
 faker.seed(99);
export const Context = ({children}) => {
    const product=[...Array(20)].map(()=> ({
   Id: faker.string.uuid(),
   name: faker.commerce.productName(), 
    price: faker.commerce.price(),
   image: faker.image.urlPicsumPhotos() , 
    inStock:faker.helpers.arrayElement([0,3,5,6,7]),
fastDelivery:faker.datatype.boolean(),
    ratings:faker.helpers.arrayElement([1,2,3,4,5])

    }))

    const [state, dispatch] = useReducer(CartReducer, {
      product:product,
      cart:[]
    })
   const [ProductState,ProductDispatch] = useReducer(ProductReducer,{
    inStock:false,
fastDelivery:false,
    ratings:0,
    serchQuary:""
   })
    
  return (
    <Cart.Provider value={{state,dispatch,ProductState,ProductDispatch}} >{children}</Cart.Provider>
  )
}

export const CartState =()=>{
return  useContext(Cart)
}


