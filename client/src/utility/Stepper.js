import React from 'react'
import { Link } from 'react-router-dom'
const Stepper = ({ step1, step2, step3 }) => {
  return (
    <div className='stepper-wrapper pdT20'>
      <div className={step1 === 'A' ? 'stepper-item stepper-active' : step1 === 'C' ? 'stepper-item completed' : 'stepper-item'}>
        <div className='step-counter'>1</div>
        <Link to='/shipping'>
          <div className='step-name text-decoration-underline'>Shipping</div>
        </Link>
      </div>
      <div className={step2 === 'A' ? 'stepper-item stepper-active' : step2 === 'C' ? 'stepper-item completed' : 'stepper-item'}>
        <div className='step-counter'>2</div>
        <Link to='/payment'>
          <div className='step-name text-decoration-underline'>Payment</div>
        </Link>
      </div>
      <div className={step3 === 'A' ? 'stepper-item stepper-active' : step3 === 'C' ? 'stepper-item completed' : 'stepper-item'}>
        <div className='step-counter'>3</div>
        <div className='step-name'>Order</div>
      </div>
    </div>
  )
}

export default Stepper
