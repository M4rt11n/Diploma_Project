import React from "react";


function Textbox(props) {
    const {
        name,
        id,
        cols,
        rows,
        placeholder
    } = props

    return (
        <div>
            {name}
            {id}
            {cols}
            {rows}
            {placeholder}
        </div>
    )
}

export default Textbox