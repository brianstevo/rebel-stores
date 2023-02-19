import React from "react"

const Rating = ({ rating, text, color = "#f8e825" }) => {
  return (
    <div>
      <i style={{ color: color }} className={rating >= 1 ? "fa-solid fa-star" : rating >= 0.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}></i>
      <i style={{ color: color }} className={rating >= 2 ? "fa-solid fa-star" : rating >= 1.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}></i>
      <i style={{ color: color }} className={rating >= 3 ? "fa-solid fa-star" : rating >= 2.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}></i>
      <i style={{ color: color }} className={rating >= 4 ? "fa-solid fa-star" : rating >= 3.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}></i>
      <i style={{ color: color }} className={rating >= 5 ? "fa-solid fa-star" : rating >= 4.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}></i>
      <span className="ps-2">{text && text}</span>
    </div>
  )
}

export default Rating
