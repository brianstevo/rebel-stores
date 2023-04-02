import React from 'react'
// import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    // <Card className='rounded p-2 my-3'>
    //   <Link to={`product/${product._id}`}>
    //     <Card.Img className='productImage' variant='top' src={product.image} />
    //   </Link>
    //   <Card.Body>
    //     <Link to={`product/${product._id}`}>
    //       <Card.Title>{product.name}</Card.Title>
    //       <Rating rating={product.rating} text={`${product.reviews} reviews`}></Rating>
    //       <Card.Text as='h3'>₹{product.price}</Card.Text>
    //     </Link>
    //   </Card.Body>
    // </Card>
    <div className='card card-border' style={{ margin: '20px' }}>
      <img className='img-responsive' src={product.image} alt='product' />
      <div className='card-body'>
        <div className='card-row'>
          <div className='card-title'>
            <h4>{product.name}</h4>
            <Rating rating={product.rating} text={`${product.reviews} reviews`}></Rating>
            <h4 className='text-align-end all-pdB10'>₹{product.price}</h4>
          </div>
          <div className='view-btn'>
            <Link to={`product/${product._id}`}>
              <button className='btn btn-teal btn-block '>View Product</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
