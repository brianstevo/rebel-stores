import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RESET } from '../actions/changeActions'
const Message = ({ variant = 'info', message, disable = false }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)

  const handleClick = () => {
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
        <div className='alert-close' onClick={(e) => handleClick()}>
          &times;
        </div>
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
