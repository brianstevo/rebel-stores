import React from "react"
import { useState } from "react"
import { Alert } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { RESET } from "../actions/changeActions"
const Message = ({ variant = "info", message }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)

  const handleClick = () => {
    dispatch({
      type: RESET,
    })
    setShow(false)
  }
  if (show) {
    return (
      <Alert variant={variant} onClose={handleClick} dismissible>
        {message}
      </Alert>
    )
  }
}

export default Message
