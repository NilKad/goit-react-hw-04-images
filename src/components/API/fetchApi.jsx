import API from 'axios';
import PropTypes from 'prop-types';

export const fetchApi = async ({
  searchString,
  page = 1,
  // addItemGallery,
  setTotalPage,
  setGallery,
}) => {
  const options = {
    url: 'https://pixabay.com/api/',
    params: {
      key: '30289004-55fd945ee926b50d65d8b1651',
      image_type: 'photo',
      q: searchString,
      page: page,
      per_page: 12,
    },
  };
  const axios = API.create(options);

  const galleryFilter = list => {
    return list.map(({ id, webformatURL, tags, largeImageURL }) => ({
      id,
      webformatURL,
      tags,
      largeImageURL,
    }));
  };

  try {
    const response = await axios.request(options);
    // addItemGallery(response.data.hits);
    setTotalPage(
      Math.ceil(response.data.total / response.config.params.per_page)
    );
    page === 1
      ? setGallery(galleryFilter(response.data.hits))
      : setGallery(prev => [...prev, ...galleryFilter(response.data.hits)]);
    console.log('response.data: ', response);
  } catch (error) {
    console.log(error);
  }
};

fetchApi.propTypes = {
  searchString: PropTypes.string.isRequired,
  pageptnr: PropTypes.number.isRequired,
  addItemGallery: PropTypes.string.isRequired,
  setTotalPage: PropTypes.number.isRequired,
};
