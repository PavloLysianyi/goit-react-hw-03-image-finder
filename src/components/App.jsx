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

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.fetchImages();
    }
  }

  handleSearchSubmit = query => {
    this.setState({
      searchQuery: query,
      images: [],
      currentPage: 1,
    });
    this.fetchImages();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleImageClick = largeImageURL => {
    this.setState({ selectedImage: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;
    if (!searchQuery) {
      return;
    }

    this.setState({ isLoading: true });

    fetchImages(searchQuery, currentPage)
      .then(({ images, hasMoreImages }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          hasMoreImages,
        }));
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { images, isLoading, hasMoreImages, selectedImage, searchQuery } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {searchQuery && (
          <>
            <ImageGallery
              images={images}
              onImageClick={this.handleImageClick}
            />
            {isLoading && <Loader />}
            {images.length > 0 && !isLoading && (
              <Button
                onLoadMore={this.handleLoadMore}
                hasMoreImages={hasMoreImages}
              />
            )}
          </>
        )}
        {selectedImage && (
          <Modal image={selectedImage} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;
