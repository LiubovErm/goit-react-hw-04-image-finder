import { ImageItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({id, largeImageURL, webformatURL, onClick}) => {

  return (
      <ImageItem key={id} onClick={() => { onClick(largeImageURL) }}>
          <Image src={webformatURL} />
      </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

