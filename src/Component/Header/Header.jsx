import React from "react";
import { Badge, Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { IoCart } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../../Context/Context";
import { AiFillDelete } from "react-icons/ai";
import "./Header.css";

export const Header = () => {
  const {
    state: { cart },
    dispatch,
    ProductDispatch
  } = CartState();

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Shopping Cart
        </Navbar.Brand>

        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            onChange={(e) =>
              ProductDispatch({
                type: "sort_by_search",
                payload: e.target.value
              })
            }
          />
        </div>

        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle className="cart-dropdown-toggle">
              <IoCart className="cart-icon" />
              {cart.length > 0 && (
                <Badge className="cart-badge">{cart.length}</Badge>
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu className="cart-dropdown-menu">
              {cart.length > 0 ? (
                <>
                  {cart.map((pro) => (
                    <div className="cart-item" key={pro.Id}>
                      <img
                        src={pro.image}
                        className="cart-item-image"
                        alt={pro.name}
                      />
                      <div className="cart-item-details">
                        <div className="cart-item-name">{pro.name}</div>
                        <div className="cart-item-price">
                          ${pro.price.split(".")[0]}
                        </div>
                      </div>
                      <AiFillDelete
                        className="delete-icon"
                        onClick={() =>
                          dispatch({
                            type: "Remove_from_cart",
                            payload: pro,
                          })
                        }
                      />
                    </div>
                  ))}
                  <Link to="/cart">
                    <Button className="go-to-cart-btn">
                      Go to Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="cart-empty">
                  <IoCart style={{ fontSize: "2rem", marginBottom: "1rem" }} />
                  <p>Your cart is empty</p>
                </div>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};
