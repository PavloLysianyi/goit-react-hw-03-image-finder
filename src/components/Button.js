import React from 'react';

const Button = ({ onLoadMore, hasMoreImages }) => (
  <button
    type="button"
    className="Button"
    onClick={onLoadMore}
    style={{ display: hasMoreImages ? 'block' : 'none' }}
  >
    Завантажити ще
  </button>
);

export default Button;
