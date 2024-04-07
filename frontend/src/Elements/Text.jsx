import React from 'react'

function Text({
  tag: Tag = 'p',
  variant = '0',
  children
}) {
  return (
    <Tag className={`text-variant-${variant}`}>
      {children}
    </Tag>
  );
}

export default Text