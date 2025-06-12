import { Form, Button } from "react-bootstrap";
import Rating from "./Rating.jsx";
import { React } from "react";
import { CartState } from "../Context/Context.jsx";
export const Filter = () => {
  const {
    ProductState: { inStock,fastDelivery, ratings, serchQuary,sort },
    ProductDispatch,
  } = CartState();
console.log(inStock,fastDelivery, ratings, serchQuary,sort );


  return (
    <div className="filters">
      <span className="title"> Filter Product</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
            onClick={()=>ProductDispatch({
            type:"sort_by_price",
            payload:"lowToHigh"
          })}
          checked={sort ==="lowToHigh" ?true:false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onClick={()=>ProductDispatch({
            type:"sort_by_price",
            payload:"highToLow"
          })}
          checked={sort ==="highToLow" ?true:false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Chack out of stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onClick={()=>ProductDispatch({
            type:"sort_by_instock",
          })}
          checked={inStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="FastDelivery only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
             onClick={()=>ProductDispatch({
            type:"sort_by_delivary",
          })}
          checked={fastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating</label>
        <Rating
          rating={ratings}
          style={{ cursor: "pointer" }}
          onClick={(i) => ProductDispatch({
            type:"sort_by_ratings",
            payload:(i + 1)
          })}
        />
      </span>
      <Button variant="light"   onClick={()=>ProductDispatch({
            type:"clear",
          })}
         > Clear Filter</Button>
    </div>
  );
};
