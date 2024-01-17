import React from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import fetchImages from './api';

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
    const nextPage = this.state.currentPage + 1;
    this.fetchImages(this.state.searchQuery, nextPage);
  };

  handleImageClick = largeImageURL => {
    this.setState({ selectedImage: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  fetchImages = (query, page) => {
    this.setState({ isLoading: true });

    fetchImages(query, page)
      .then(({ images, hasMoreImages }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: page,
          hasMoreImages,
        }));
      })
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
