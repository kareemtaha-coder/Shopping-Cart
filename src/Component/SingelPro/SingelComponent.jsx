import React from 'react'
import { CartState } from '../../Context/Context'
import { FaShoppingCart, FaHeart, FaStar, FaTruck, FaCheck } from 'react-icons/fa'
import './style.css'

export const SingelComponent = ({ pro }) => {
  const { state: { cart }, dispatch } = CartState()

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={pro.image} alt={pro.name} />
        {pro.fastDelivery && (
          <div className="delivery-badge">
            <FaTruck /> Fast Delivery
          </div>
        )}
        {!pro.inStock && (
          <div className="out-of-stock-badge">
            Out of Stock
          </div>
        )}
      </div>

      <div className="product-content">
        <div className="product-category">{pro.category}</div>
        <h3 className="product-name">{pro.name}</h3>
        
        <div className="product-rating">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={index < pro.ratings ? "star-filled" : "star-empty"}
            />
          ))}
          <span className="rating-count">({pro.ratings})</span>
        </div>

        <div className="product-price">
          <span className="current-price">₹{pro.price}</span>
          {pro.originalPrice && (
            <span className="original-price">₹{pro.originalPrice}</span>
          )}
        </div>

        <div className="product-features">
          {pro.inStock && <span className="feature"><FaCheck /> In Stock</span>}
          {pro.fastDelivery && <span className="feature"><FaTruck /> Fast Delivery</span>}
        </div>

        <div className="product-actions">
          {cart.some(p => p.Id === pro.Id) ? (
            <button
              className="remove-from-cart"
              onClick={() => {
                dispatch({
                  type: "Remove_from_cart",
                  payload: pro
                })
              }}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className="add-to-cart"
              onClick={() => {
                dispatch({
                  type: "Add_to_cart",
                  payload: pro
                })
              }}
              disabled={!pro.inStock}
            >
              <FaShoppingCart /> Add to Cart
            </button>
          )}
          <button className="add-to-wishlist">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  )
}
