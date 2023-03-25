import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='rounded p-2 my-3'>
      <Link to={`product/${product._id}`}>
        <Card.Img className='productImage' variant='top' src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`product/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
          <Rating rating={product.rating} text={`${product.reviews} reviews`}></Rating>
          <Card.Text as='h3'>₹{product.price}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Product
