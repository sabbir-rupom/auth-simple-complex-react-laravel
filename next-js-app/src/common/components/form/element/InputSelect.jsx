import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const InputSelect = ({ label, required, layout, value, options, error, handleChange, ...attrs }) =>
{
  return (

    <FormControl fullWidth error={error ?? null}>
      {
        label ? (
          <InputLabel className="form-input-label">
            {label} {required ? '*' : null}
          </InputLabel>
        ) : null
      }
      <Select
        value={value ?? ''}
        label={label}
        onChange={handleChange}
        {...attrs}
      >
        <MenuItem value="0">
          <em>Choose an Option</em>
        </MenuItem>
        {
          options.map((opt) => (
            <MenuItem key={opt.id} value={opt.id}>{opt.value}</MenuItem>
          ))

        }
      </Select>
      {
        error ? (
          <p className='error pt-1'>{error}</p>
        ) : null
      }

    </FormControl>
  )
}

export default InputSelect