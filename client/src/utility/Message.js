import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RESET } from '../actions/changeActions'
const Message = ({ variant = 'info', message, disable = false }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)

  const handleClick = () => {
    console.log('s')
    dispatch({
      type: RESET,
    })
    setShow(false)
  }
  if (show && !disable) {
    return (
      // <Alert variant={variant} onClose={handleClick} dismissible>
      //   {message}
      // </Alert>
      <div className={'alert ' + variant}>
        <button className='alert-close' onClick={() => console.log('button clicked')}>
          &times;
        </button>
        <p>{message}</p>
      </div>
    )
  }
  if (show && disable) {
    return (
      <div className={'alert ' + variant}>
        <p>{message}</p>
      </div>
    )
  }
}

export default Message
