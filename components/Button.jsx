import React from 'react'
import { Loading } from '.'

const Button = ({ type, title = null, icon=null, es= null, loading = false, clickAction = null, outlined = false, disabled = false, danger = false }) => {
  const handleClickAction = () => {
    if (clickAction) clickAction();
  }
  return (
    <button 
    type={type} 
    disabled={disabled}  
    className={`btn ${es} ${!outlined ? 'primary-btn' : 'outline-btn'} ${icon ? 'flex gap-1 items-center' : 'justify-center'} ${danger ? 'danger-btn' : 'normal-btn'}`} 
    onClick={handleClickAction} 
    title={title}
  >
    {loading ? (
      <Loading /> // Show only Loading when true
    ) : (
      <>
        {icon && <img src={icon} alt='button icon' width={20} height={20} />}
        {title && <span>{title}</span>}
      </>
    )}
  </button>
  
  )
}

export default Button