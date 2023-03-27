import { TextField } from '@mui/material'
import React from 'react'

const InputText = ({ label, type, value, required, className, error, ...attrs }) =>
{

  // console.log(...attrs)

  return (
    <>

      <TextField
        required={required}
        // id="outlined-required"
        label={label ? `${label} ${required ? '*' : ''}` : null}
        type={type ?? 'text'}
        defaultValue={value}
        className={`form-text-input ${className ? className : ''} ${error ? 'input-error' : ''}`}
        autoComplete='off'
        {...attrs}
      />

      {
        error ? (
          <p className='error pt-1'>{error}</p>
        ) : null
      }
    </>
  )
}

export default InputText