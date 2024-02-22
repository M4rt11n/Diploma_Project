import React from "react";


function Checkbox(props) {
    const {
        checked,
        onClick,
        onChange
    } = props

    return (
        <div>
            {checked}
            {onClick}
            {onChange}
        </div>
    )
}

export default Checkbox