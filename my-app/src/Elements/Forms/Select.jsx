import React from "react";


function Select(props) {
    const {
        placeholder,
        value,
        options,
        onChange
    } = props

    return (
        <div>
            {placeholder}
            {value}
            {options}
            {onChange}
        </div>
    )
}

export default Select