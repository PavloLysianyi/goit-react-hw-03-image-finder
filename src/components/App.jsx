import React from 'react';
import { Puff } from 'react-loader-spinner';

class Searchbar extends React.Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button"></button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Шукати зображення та фотографії"
            value={this.state.query}
            onChange={e => this.setState({ query: e.target.value })}
          />
        </form>
      </header>
    );
  }
}

const ImageGalleryItem = ({ image, onImageClick }) => (
  <li
    className="ImageGalleryItem"
    onClick={() => onImageClick(image.largeImageURL)}
  >
    <img className="ImageGalleryItem-image" src={image.webformatURL} alt="" />
  </li>
);

const ImageGallery = ({ images, onImageClick }) => (
  <ul className="ImageGallery">
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        image={image}
        onImageClick={onImageClick}
      />
    ))}
  </ul>
);

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

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <img src={this.props.image} alt="" />
        </div>
      </div>
    );
  }
}

const Loader = () => (
  <div className="loader">
    <Puff color="#00BFFF" height={100} width={100} />
  </div>
);

class App extends React.Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    selectedImage: null,
    hasMoreImages: false,
  };

  handleSearchSubmit = query => {
    this.setState({
      searchQuery: query,
      images: [],
      currentPage: 1,
      hasMoreImages: true,
    });

    this.fetchImages(query, 1);
  };

  handleLoadMore = () => {
    this.fetchImages(this.state.searchQuery, this.state.currentPage + 1);
  };

  handleImageClick = largeImageURL => {
    this.setState({ selectedImage: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  fetchImages = (query, page) => {
    this.setState({ isLoading: true });

    const apiKey = '41251616-25bd2bca1571a95c770fcbb5d';
    const perPage = 12;

    const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.hits.length === 0) {
          this.setState({ hasMoreImages: false });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            currentPage: page,
            hasMoreImages: page < Math.ceil(data.totalHits / perPage),
          }));
        }
      })
      .catch(error => console.error('Error fetching images:', error))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { images, isLoading, hasMoreImages, selectedImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button
            onLoadMore={this.handleLoadMore}
            hasMoreImages={hasMoreImages}
          />
        )}
        {selectedImage && (
          <Modal image={selectedImage} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;
