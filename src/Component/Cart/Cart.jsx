import React, { useEffect, useState } from 'react'
import { CartState } from '../../Context/Context'
import { FaTrash, FaShoppingBag, FaTruck, FaCreditCard } from 'react-icons/fa'
import './Cart.css'

export const Cart = () => {
  const { state: { cart }, dispatch } = CartState()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + Number(cur.price) * cur.qty, 0))
  }, [cart])

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p className="cart-subtitle">
          {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {cart.length > 0 ? (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((pro) => (
              <div className="cart-item" key={pro.Id}>
                <div className="cart-item-image">
                  <img src={pro.image} alt={pro.name} />
                </div>
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{pro.name}</h3>
                  <div className="cart-item-meta">
                    <span className="cart-item-price">₹{pro.price}</span>
                    {pro.fastDelivery && (
                      <span className="delivery-badge">
                        <FaTruck /> Fast Delivery
                      </span>
                    )}
                  </div>
                </div>

                <div className="cart-item-quantity">
                  <select
                    value={pro.qty}
                    onChange={(e) => dispatch({
                      type: "Change_Cart_Qty",
                      payload: {
                        id: pro.Id,
                        qty: e.target.value
                      }
                    })}
                  >
                    {[...Array(pro.inStock)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="cart-item-total">
                  ₹{(Number(pro.price) * pro.qty).toFixed(2)}
                </div>

                <button
                  className="remove-item-btn"
                  onClick={() => dispatch({
                    type: "Remove_from_cart",
                    payload: pro
                  })}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-header">
              <FaShoppingBag />
              <h2>Order Summary</h2>
            </div>

            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="checkout-btn">
              <FaCreditCard />
              Proceed to Checkout
            </button>

            <div className="cart-features">
              <div className="feature">
                <FaTruck />
                <span>Free Delivery</span>
              </div>
              <div className="feature">
                <FaCreditCard />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <FaShoppingBag className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <button className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  )
}
