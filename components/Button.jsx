import React from 'react'
import { Loading } from '.'

const Button = ({ type, title = null, icon=null, es= null, loading = false, clickAction = null, outlined = false }) => {
  const handleClickAction = () => {
    if (clickAction) clickAction();
  }
  return (
    <button type={type}  className={`btn ${es} ${!outlined ? 'primary-btn' : 'outline-btn'} ${icon ? 'flex gap-1 items-center' : 'justify-center'}`} onClick={handleClickAction} title={title}>
      {icon && <img src={icon} alt='button icon' width={20} height={20} />}
      {title && <span> {loading ? <Loading /> : title} </span>}
    </button>
  )
}

export default Button