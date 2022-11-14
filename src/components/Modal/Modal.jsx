import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  static PrpoTypes = {
    modalClose: PropTypes.func.isRequired,
    onLoadingFinish: PropTypes.func.isRequired,
    modalItem: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  };

  onEscape = e => {
    console.log('keyCode: ', e);
    if (e.code === 'Escape') {
      this.props.modalClose();
    }
  };

  onClickOverlay = e => {
    e.target === e.currentTarget && this.props.modalClose();
  };

  componentDidMount() {
    console.log('modal open!');
    console.log(this.props);
    window.addEventListener('keydown', this.onEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscape);
  }

  render() {
    const { onLoadingFinish } = this.props;
    const { modalItem } = this.props;
    const { largeImageURL, tags } = modalItem;
    return (
      <div className={css.overlay} onClick={this.onClickOverlay}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} onLoad={onLoadingFinish}></img>
        </div>
      </div>
    );
  }
}
