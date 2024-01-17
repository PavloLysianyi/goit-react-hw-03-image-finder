import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className="ImageGallery">
    {images.map((image, index) => (
      <ImageGalleryItem
        key={`${image.id}-${index}`}
        image={image}
        onImageClick={onImageClick}
      />
    ))}
  </ul>
);

export default ImageGallery;
