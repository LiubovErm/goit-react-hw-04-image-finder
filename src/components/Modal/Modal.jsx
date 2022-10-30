import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ImageWrapper, LargeImage } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, largeImage }) => {

  useEffect(() => {
    window.addEventListener('keydown', closeModalEsc);
    return () => {window.removeEventListener('keydown', closeModalEsc);
    };
  });

  const closeModalBackdrop = event => {
    if (event.currentTarget === event.target) {
      onClose();
      }
  };

  const closeModalEsc = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

    return createPortal (
      <Backdrop onClick={closeModalBackdrop}>
        <ImageWrapper>
          <LargeImage src={largeImage} />
        </ImageWrapper>
      </Backdrop>,
      modalRoot
    );
  }


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};




