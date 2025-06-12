import React from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CartState } from "../../Context/Context";
import { AiFillDelete } from "react-icons/ai";
export const Header = () => {
  const {
    state: { cart },
    dispatch,ProductDispatch
  } = CartState();
  return (
    <div>
      <Navbar bg="dark" variant="dark" style={{ height: 60 }}>
        <Container>
          <Navbar.Brand>
            <Link to={"/"} className="listStyle-none">
              Shopping Cart
            </Link>
          </Navbar.Brand>
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 400 }}
              placeholder="Search A Proudct"
              className="m-auto"
              onClick={(e)=>
                ProductDispatch({
                  type:"sort_by_search",
                  payload:e.target.value
                })
              }
            />
          </Navbar.Text>
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <IoCart color="white " fontSize={"25px"} />
                <Badge>{cart.length}</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ minWidth: 340 }}>
                {cart.length > 0 ? (
                  <>
                    {cart.map((pro) => (
                      <span className="CartItem" key={pro.Id}>
                        <img
                          src={pro.image}
                          className="CartItemImage"
                          alt={pro.name}
                        />
                        <div className="CartItemDetail">
                          <span>{pro.name}</span>
                          <span>$ {pro.price.split(".")[0]}</span>
                        </div>
                        <AiFillDelete
                          fontSize="20px"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch({
                              type: "Remove_from_cart",
                              payload: pro,
                            })
                      
                            
                          }
                        />
                      </span>
                    ))}
                    <Link to="/cart">
                      <Button style={{ width: "95%", margin: "0 10px" }}>
                        {" "}
                        Add To Cart
                      </Button>
                    </Link>
                  </>
                ) : (
                  <span style={{ padding: 10 }}>Cart is Empty!</span>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
