import React from 'react'
import { CartState } from '../../Context/Context'
import { SingelComponent } from '../SingelPro/SingelComponent'
import { Filter } from "../Filter"
import { Container, Row, Col } from 'react-bootstrap'
import { FaShoppingBag, FaSearch, FaFilter, FaTruck, FaStar } from 'react-icons/fa'
import './Home.css'

export const Home = () => {
  const { state: { product }, ProductState: { inStock, fastDelivery, ratings, serchQuary, sort } } = CartState()

  const transformProduct = () => {
    let SortedProducts = product;
    if (sort) {
      SortedProducts = SortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price);
    }
    if (!inStock) {
      SortedProducts = SortedProducts.filter((prod) => prod.inStock)
    }
    if (fastDelivery) {
      SortedProducts = SortedProducts.filter((prod) => prod.fastDelivery)
    }
    if (serchQuary) {
      SortedProducts = SortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(serchQuary)
      )
    }
    if (ratings) {
      SortedProducts = SortedProducts.filter((prod) => prod.ratings >= ratings)
    }
    return SortedProducts
  }

  const filteredProducts = transformProduct()

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <div className="hero-content">
            <h1 className="hero-title">Discover Amazing Products</h1>
            <p className="hero-subtitle">
              Shop the latest trends with our curated collection of high-quality products.
              Find everything you need at unbeatable prices.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <FaShoppingBag className="stat-icon" />
                <span>{product.length} Products</span>
              </div>
              <div className="stat-item">
                <FaTruck className="stat-icon" />
                <span>Fast Delivery</span>
              </div>
              <div className="stat-item">
                <FaStar className="stat-icon" />
                <span>Top Rated</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="main-content">
        <Row>
          {/* Filters Sidebar */}
          <Col lg={3} className="filter-sidebar">
            <Filter />
          </Col>

          {/* Products Grid */}
          <Col lg={9}>
            <div className="products-header">
              <div className="products-title">
                <h2>Featured Products</h2>
                <span className="product-count">{filteredProducts.length} products found</span>
              </div>
              
              {(sort || !inStock || fastDelivery || ratings > 0) && (
                <div className="active-filters">
                  {sort && (
                    <span className="filter-tag">
                      <FaFilter /> {sort === "lowToHigh" ? "Price: Low to High" : "Price: High to Low"}
                    </span>
                  )}
                  {!inStock && <span className="filter-tag"><FaFilter /> In Stock Only</span>}
                  {fastDelivery && <span className="filter-tag"><FaTruck /> Fast Delivery</span>}
                  {ratings > 0 && <span className="filter-tag"><FaStar /> {ratings}+ Stars</span>}
                </div>
              )}
            </div>
            
            <div className="products-grid">
              {filteredProducts.map((pro) => (
                <div className="product-card-wrapper" key={pro.Id}>
                  <SingelComponent pro={pro} />
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-products">
                <FaSearch className="no-products-icon" />
                <h3>No products found</h3>
                <p>Try adjusting your filters or search query</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}
