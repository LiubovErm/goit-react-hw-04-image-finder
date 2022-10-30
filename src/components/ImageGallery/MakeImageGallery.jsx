import { fetchPictures } from '../../services/images-api';
import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { Box } from '../Box/Box';
import { toast } from 'react-toastify';
import { Loader } from '../Loader/Loader';
import PropTypes from 'prop-types';
import oops from '../ImageGallery/oops.png'
import { RejectedBox } from './ImageGallery.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const MakeImageGallery = ({ findImage }) => {

  const [imagesName, setImagesName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [isModal, setIsModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [showBtnLoadMore, setShowBtnLoadMore] = useState(false);


  useEffect(() => {
    if (imagesName !== findImage) {
      setImagesName(findImage);
      setPage(1);
      setImages([]);
      setStatus(Status.PENDING);

      fetchPictures(findImage, 1)
        .then(images => {
          if (images.totalHits <= 12) {
            setShowBtnLoadMore(false);
          } else {setShowBtnLoadMore(true);}
          
          setImages(images.hits);
          setStatus(Status.RESOLVED);
          toast.success(`Hooray! We found ${images.totalHits} images.`, { theme: "colored" });
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
      return;
    }

    if (page !== 1) {
      setPage(page);
      setStatus(Status.PENDING);

      fetchPictures(imagesName, page)
        .then(images => {
          if (page === Math.ceil(images.totalHits / 12)) {
            setShowBtnLoadMore(false);
            toast.info("We're sorry, but you've reached the end of search results.", { theme: "colored" });
          }
          setImages(prev => [...prev, ...images.hits]);
          setStatus(Status.RESOLVED);
           window.scrollBy({
           top: 220,
           left: 0,
           behavior: 'smooth',
          });
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
      return;
    }
   
  }, [imagesName, findImage, page]);

 const onNextPage = page => {
    setPage(page);
  };

  const openModal = url => {
    setLargeImage(url);
    toggleModal();
    };
    
  const toggleModal = () => {
     setIsModal(!isModal);
  };
    
  switch (status) {
    
    case 'idle':
      return <Box width={500} height={500} mx='auto' pt={100} fontSize={56} fontWeight={500} display="flex" justifyContent="center" > Введіть щось </Box>
    case 'pending':
      return (
        <>
          <Box maxWidth={1500} mx='auto'>
            <ImageGallery images={images} onImageClick={openModal} />
          </Box>
          <Loader />
        </>
      );
    case 'rejected':
      return (
        <Box width={500} mx='auto' pt={100} display="flex" justifyContent="center" >
          <RejectedBox src={oops} />
        </Box>);

    case 'resolved':
      return (
        <>
          <Box maxWidth={1500} mx='auto'>
            <ImageGallery images={images} onImageClick={openModal} />
            {showBtnLoadMore && (<Button onClick={onNextPage} page={page} /> )};
            {isModal && (<Modal largeImage={largeImage} onClose={toggleModal} />)}
          </Box>
        </>
      );
    default: return;
  }
  }

MakeImageGallery.propTypes = {
  findImage: PropTypes.string.isRequired,
};