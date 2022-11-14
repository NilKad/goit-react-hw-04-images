import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ galleryItem, modalOpen }) => {
  const { webformatURL, tags, largeImageURL } = galleryItem;

  return (
    <li className={css.imageGalleryItem}>
      {
        <img
          onClick={() => modalOpen({ tags, largeImageURL })}
          src={webformatURL}
          alt={tags}
          className={css.imageGalleryItemImage}
        ></img>
      }
    </li>
  );
};

ImageGalleryItem.propTypes = {
  galleryItem: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  modalOpen: PropTypes.func.isRequired,
};
