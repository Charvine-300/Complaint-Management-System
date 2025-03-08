import React from 'react'
import { Loading } from '.'

const Button = ({ title, type, loading = false, clickAction = null, outlined = false }) => {
  const handleClickAction = () => {
    if (clickAction) clickAction();
  }
  return (
    <button type={type}  className={`btn ${!outlined ? 'primary-btn' : 'outline-btn'}`} onClick={handleClickAction}>
      {loading ? <Loading /> : title}       
    </button>
  )
}

export default Button