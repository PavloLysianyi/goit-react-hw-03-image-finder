import React from 'react';
import { Puff } from 'react-loader-spinner';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};

const ImageGalleryItem = ({ image, onImageClick }) => {
  return (
    <li
      className="gallery-item"
      onClick={() => onImageClick(image.largeImageURL)}
    >
      <img src={image.webformatURL} alt="" />
    </li>
  );
};

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="gallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
};

const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className="load-more-button" onClick={onLoadMore}>
      Load more
    </button>
  );
};

const Modal = ({ image, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

const App = () => {
  const [images, setImages] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setCurrentPage(1);
    fetchImages(query, 1);
  };

  const handleLoadMore = () => {
    fetchImages(searchQuery, currentPage + 1);
  };

  const handleImageClick = largeImageURL => {
    setSelectedImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const fetchImages = (query, page) => {
    setIsLoading(true);

    const apiKey = '41251616-25bd2bca1571a95c770fcbb5d';
    const perPage = 12;

    const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setCurrentPage(page);
      })
      .catch(error => console.error('Error fetching images:', error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button onLoadMore={handleLoadMore} />
      )}
      {selectedImage && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};
const Loader = () => {
  return (
    <div className="loader">
      <Puff color="#00BFFF" height={100} width={100} />
    </div>
  );
};
export default App;
