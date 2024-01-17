const fetchImages = (query, page) => {
  const apiKey = '41251616-25bd2bca1571a95c770fcbb5d';
  const perPage = 12;

  const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.hits.length === 0) {
        return { images: [], hasMoreImages: false };
      } else {
        return {
          images: data.hits,
          hasMoreImages: page < Math.ceil(data.totalHits / perPage),
        };
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      return { images: [], hasMoreImages: false };
    });
};

export default fetchImages;
