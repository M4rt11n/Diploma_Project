import React, { Children } from 'react';


function Button(props) {

  const {  
    variant, 
    onClick, 
    disabled, 
    children
  } = props
  return (
    <button className={"btn"} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
