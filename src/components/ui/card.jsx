import React from "react"

export const Card = ({ children, className }) => {
  return <div className={`border rounded-lg ${className}`}>{children}</div>
}

export const CardHeader = ({ children, className }) => {
  return <div className={`p-6 ${className}`}>{children}</div>
}

export const CardTitle = ({ children, className }) => {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
}

export const CardContent = ({ children, className }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}