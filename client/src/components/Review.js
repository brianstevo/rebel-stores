import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { reviewProduct } from '../actions/productActions'
import Rating from '../utility/Rating'

const Review = ({ id, reviews = [] }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const submitHandler = (data, e) => {
    e.preventDefault()
    dispatch(reviewProduct(id, { rating: data.rating, comment: data.comment }))
  }
  return (
    <>
      <div className='flex-col-sm-12'>
        <h2 className='pdB10'>Reviews</h2>

        <div className='flex-row pdB20'>
          <div className='flex-col-md-6'>
            {reviews.length === 0 && 'No reviews yet'}
            {reviews.length > 0 &&
              reviews.map((item) => (
                <div className='review-border '>
                  <h4>{item.name}</h4>
                  <Rating rating={item.rating} />
                  <p>{item.updatedAt.substring(0, 10)}</p>
                  <p>{item.comment}</p>
                </div>
              ))}
          </div>
          <div className='flex-col-md-1'></div>
          {userInfo && (
            <div className='flex-col-md-5'>
              <h3 className=' pdB10'>Write a Review</h3>
              <form className='form' onSubmit={handleSubmit(submitHandler)}>
                <label className='label'>Rating</label>
                <select className='mgY10 text' {...register('rating', { required: 'Rating is required' })} aria-invalid={errors.name ? 'true' : 'false'}>
                  <option value=''></option>
                  <option value='1'>1 - Poor</option>
                  <option value='2'>2 - Fair</option>
                  <option value='3'>3 - Good</option>
                  <option value='4'>4 - Very Good</option>
                  <option value='5'>5 - Excellent</option>
                </select>
                {errors.rating && <p className='red'>{errors.rating?.message}</p>}
                <label className='label'>Comment</label>
                <textarea
                  style={{ resize: 'vertical' }}
                  className='mgY10 text'
                  {...register('comment', {
                    required: 'Comment is required',
                  })}
                  aria-invalid={errors.comment ? 'true' : 'false'}
                />
                {errors.comment && <p className='red'>{errors.comment?.message}</p>}
                <button className='mgT20 btn-blue btn-block btn' type='submit'>
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Review
