import React from "react";


function Radio(props) {
    const {
        name,
        group,
        id,
        value
    } = props

    return (
        <div>
            {name}
            {group}
            {id}
            {value}
        </div>
    )
}

export default Radio