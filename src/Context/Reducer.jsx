export const CartReducer =(state ,action)=>{
console.log(state);


  switch (action.type) {
    case "Add_to_cart":
      return{...state,cart:[...state.cart,{...action.payload ,qty:1}]};
      case "Remove_from_cart":
      return{
        ...state,
        cart: state.cart.filter((p)=>p.Id!== action.payload.Id),};
    case "Change_Cart_Qty":
      return{
        ...state,
        cart: state.cart.filter((c)=>c.Id=== action.payload.id?(c.qty=action.payload.qty):c.qty),

      };
    default:
 return state
  }

}
export const ProductReducer=(state,action)=>{
  switch (action.type) {
    case "sort_by_price":
      return {...state,sort:action.payload}
  
    case "sort_by_instock":
      return {...state,inStock:!state.inStock}
  
    case "sort_by_delivary":
      return {...state,fastDelivery:!state.fastDelivery}
  
    case "sort_by_ratings":
      return {...state,ratings:action.payload}
  
    case "sort_by_search":
      return {...state,serchQuary:action.payload}
  
    case "clear":
      return {  inStock:false,
fastDelivery:false,
    ratings:0,
    serchQuary:""}
  
    default:
   return state
  }
}