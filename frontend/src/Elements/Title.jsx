import React from 'react'

function Title({
  tag: Tag = 'h2',
  variant = '0',
  children
}) {
  return (
    <Tag className={`title variant-${variant}`}>
      {children}
    </Tag>
  );
}

export default Title