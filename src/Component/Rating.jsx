import React from 'react'
import { FaStar } from 'react-icons/fa'
import './Rating.css'

const Rating = ({ rating, onClick, style }) => {
  return (
    <div className="rating-container" style={style}>
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`star ${index < rating ? 'filled' : ''}`}
          onClick={() => onClick && onClick(index)}
        />
      ))}
      {rating > 0 && <span className="rating-text">{rating} Stars</span>}
    </div>
  )
}

export default Rating