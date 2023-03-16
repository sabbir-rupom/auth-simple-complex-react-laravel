import React from 'react'

const ButtonSubmit = ({ label, type = 'submit', disabled = false, className = null, ...attrs }) =>
{
  if(disabled) {
    return (
      <button className="form-button opacity-50 cursor-not-allowed" disabled>
        {label}
      </button>
    )
  }

  return (
    <button className={`form-button ${className ? className : null}`} type={type} {...attrs}>
      {label}
    </button>
  )
}

export default ButtonSubmit