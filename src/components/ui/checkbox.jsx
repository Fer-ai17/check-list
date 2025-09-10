import React, { useState } from "react"

export const Checkbox = ({ checked, onCheckedChange, className }) => {
  const [isChecked, setIsChecked] = useState(checked || false)
  
  const handleChange = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    if (onCheckedChange) {
      onCheckedChange(newValue)
    }
  }
  
  return (
    <input 
      type="checkbox" 
      checked={isChecked} 
      onChange={handleChange} 
      className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ${className}`}
    />
  )
}