import React from "react";

function Pic(props) {
  const { src } = props;

  return <img src={src}></img>;
}

export default Pic;
