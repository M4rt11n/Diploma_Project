import React from "react";


function Link(props) {
    const {
        link,
        children
    } = props

    return (
        <a href={link}>{children}</a>
    )
}

export default Link