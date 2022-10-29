import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ImageWrapper, LargeImage } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.closeModalEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalEsc);
  }

  closeModalBackdrop = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
      }
  };

  closeModalEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage } = this.props;

    return createPortal (
      <Backdrop onClick={this.closeModalBackdrop}>
        <ImageWrapper>
          <LargeImage src={largeImage} />
        </ImageWrapper>
      </Backdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};




