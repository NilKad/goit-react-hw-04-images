import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ onLoadingFinish, modalItem, setModalItem }) => {
  const { largeImageURL, tags } = modalItem;

  const onClickOverlay = e => {
    e.target === e.currentTarget && setModalItem();
  };

  useEffect(() => {
    const onEscape = e => {
      console.log('keyCode: ', e);
      if (e.code === 'Escape') {
        setModalItem();
      }
    };
    console.log('modal open!');
    window.addEventListener('keydown', onEscape);

    return () => {
      console.log('unmount event!!!!');
      window.removeEventListener('keydown', onEscape);
    };
  }, [setModalItem]);

  return (
    <div className={css.overlay} onClick={onClickOverlay}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} onLoad={onLoadingFinish}></img>
      </div>
    </div>
  );
};

Modal.propTypes = {
  setModalItem: PropTypes.func.isRequired,
  onLoadingFinish: PropTypes.func.isRequired,
  modalItem: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
