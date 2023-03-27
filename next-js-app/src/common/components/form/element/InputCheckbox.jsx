import React from 'react'

const InputCheckbox = ({ label, checked, value, error, ...attrs }) =>
{

  return (
    <div className="flex items-center">
      <input type="checkbox" value={value} className="form-checkbox" checked={checked} {...attrs} />
      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
      {
        error ? (
          <p className='error pt-1'>{error}</p>
        ) : null
      }
    </div>
  )
}

export default InputCheckbox