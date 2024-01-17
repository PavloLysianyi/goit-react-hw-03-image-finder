import React from 'react';

const ImageGalleryItem = ({ image, onImageClick }) => (
  <li
    className="ImageGalleryItem"
    onClick={() => onImageClick(image.largeImageURL)}
  >
    <img className="ImageGalleryItem-image" src={image.webformatURL} alt="" />
  </li>
);

export default ImageGalleryItem;
