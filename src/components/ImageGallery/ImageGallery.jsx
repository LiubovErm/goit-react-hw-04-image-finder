import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ImageList>
      {images.map(({id, largeImageURL, webformatURL }) => (
          <ImageGalleryItem
            key={id}
            largeImageURL={largeImageURL}
            webformatURL={webformatURL}
            onClick={onImageClick}/>
        )
      )}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
