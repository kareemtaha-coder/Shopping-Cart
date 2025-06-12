import { Form, Button } from "react-bootstrap";
import Rating from "./Rating.jsx";
import { React } from "react";
import { CartState } from "../Context/Context.jsx";
import { FaFilter, FaSort, FaTruck, FaStar, FaTimes } from 'react-icons/fa';
import './Filter.css';

export const Filter = () => {
  const {
    ProductState: { inStock, fastDelivery, ratings, serchQuary, sort },
    ProductDispatch,
  } = CartState();

  const hasActiveFilters = sort || !inStock || fastDelivery || ratings > 0;

  return (
    <div className="filters-container">
      <div className="filters-header">
        <FaFilter className="filter-tag-icon" />
        <h3 className="filters-title">Filters</h3>
      </div>

      {hasActiveFilters && (
        <div className="active-filters">
          {sort && (
            <span className="filter-tag">
              <FaSort className="filter-tag-icon" />
              {sort === "lowToHigh" ? "Price: Low to High" : "Price: High to Low"}
            </span>
          )}
          {!inStock && (
            <span className="filter-tag">
              <FaFilter className="filter-tag-icon" />
              In Stock Only
            </span>
          )}
          {fastDelivery && (
            <span className="filter-tag">
              <FaTruck className="filter-tag-icon" />
              Fast Delivery
            </span>
          )}
          {ratings > 0 && (
            <span className="filter-tag">
              <FaStar className="filter-tag-icon" />
              {ratings}+ Stars
            </span>
          )}
        </div>
      )}

      <div className="filter-section">
        <h4 className="filter-section-title">Price Range</h4>
        <div className="price-filters">
          <Form.Check
            type="radio"
            id="lowToHigh"
            label="Price: Low to High"
            name="priceSort"
            onClick={() => ProductDispatch({
              type: "sort_by_price",
              payload: "lowToHigh"
            })}
            checked={sort === "lowToHigh"}
          />
          <Form.Check
            type="radio"
            id="highToLow"
            label="Price: High to Low"
            name="priceSort"
            onClick={() => ProductDispatch({
              type: "sort_by_price",
              payload: "highToLow"
            })}
            checked={sort === "highToLow"}
          />
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-section-title">Availability</h4>
        <div className="availability-filters">
          <Form.Check
            type="checkbox"
            id="inStock"
            label="In Stock Only"
            onClick={() => ProductDispatch({
              type: "sort_by_instock",
            })}
            checked={inStock}
          />
          <Form.Check
            type="checkbox"
            id="fastDelivery"
            label="Fast Delivery"
            onClick={() => ProductDispatch({
              type: "sort_by_delivary",
            })}
            checked={fastDelivery}
          />
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-section-title">Rating</h4>
        <div className="rating-filter">
          <Rating
            rating={ratings}
            onClick={(i) => ProductDispatch({
              type: "sort_by_ratings",
              payload: (i + 1)
            })}
          />
          <span className="rating-text">
            {ratings ? `${ratings} Stars & Up` : 'All Ratings'}
          </span>
        </div>
      </div>

      {hasActiveFilters && (
        <Button 
          className="clear-filters-btn"
          onClick={() => ProductDispatch({
            type: "clear",
          })}
        >
          <FaTimes />
          Clear All Filters
        </Button>
      )}
    </div>
  );
};
