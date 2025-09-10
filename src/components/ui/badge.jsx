import React from "react"

export const Badge = ({ children, className, variant = "default" }) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  const variantClasses = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    destructive: "border-transparent bg-destructive text-destructive-foreground",
    outline: "text-foreground"
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className || ""}`
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}