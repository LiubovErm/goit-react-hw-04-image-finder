import { fetchPictures } from '../../services/images-api';
import { Component } from 'react';
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

export class MakeImageGallery extends Component {
  state = {
    images: [],
    largeImage: '',
    page: 1,
    status: Status.IDLE,
    error: null,
    showModal: false,
    showBtnLoadMore: false,
    showLoader: false,
    smoothScroll: false,
  };

  componentDidUpdate = prevProps => {
    const prevImage = prevProps.imagesName;
    const nextImage = this.props.imagesName; 
      
    if (prevImage !== nextImage) {
      this.setState({ status: Status.PENDING, page: 1, showLoader: true }, () => {
        const page = this.state.page;

        fetchPictures(nextImage, page)
        .then(images => {
             if (images.totalHits !== 0) {
               toast.success(`Hooray! We found ${images.totalHits} images.`, { theme: "colored" });
               this.setState({showBtnLoadMore: true });
                } if (images.totalHits <= 12) {
               this.setState({showBtnLoadMore: false});}
           
            this.setState({
            images: [...images.hits],
            status: Status.RESOLVED,
            showLoader: false,
            smoothScroll: true,
            });
        })
       .catch(error => this.setState({ error, status: Status.REJECTED }));
});
}
};

  onNextPage = () => {
        
    this.setState(
      prevState => ({page: (prevState.page += 1),}),() => {
        this.setState({ status: Status.PENDING, showLoader: true });
        const page = this.state.page;
        const nextImage = this.props.imagesName;
        const { smoothScroll } = this.state;

        fetchPictures(nextImage, page)
          .then(images => {
              if (page === Math.ceil(images.totalHits / 12)) {
                  toast.info("We're sorry, but you've reached the end of search results.", { theme: "colored" });
                  this.setState( {showBtnLoadMore: false});
              }
             
            this.setState(prevState => ({
                images: [...prevState.images, ...images.hits],
                status: Status.RESOLVED,
                showLoader: false,
                smoothScroll: true,
            }));
            if (smoothScroll) {this.windowScroll();}
          })
          .catch(error => this.setState({ error, status: Status.REJECTED }));
      }
    );
  };

  openModal = url => {
    this.setState({ largeImage: url});
    this.toggleModal();
    };
    
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
    
  windowScroll = () => {
    window.scrollBy({
      top: 220,
      left: 0,
      behavior: 'smooth',
    });
  };

  render() {
   const { status, images, largeImage, showModal, showBtnLoadMore, showLoader } = this.state;
     
    if (status === 'idle') {
       return (
       <Box width = {500} height = {500} mx='auto' pt = {100} fontSize = {56} fontWeight ={500} display ="flex" justifyContent="center" > Введіть щось </Box>
       )
    }

    if (status === 'rejected') {
      return (
      <Box width = {500} mx='auto' pt = {100} display ="flex" justifyContent="center" > 
      <RejectedBox src = {oops}/>
      </Box>
      )
    }

    if (status === 'pending'|| status === 'resolved') {
      return (
        <Box maxWidth={1500} mx='auto'>
          <ImageGallery images={images} onImageClick={this.openModal}/>
          {showModal && (<Modal largeImage={largeImage} onClose={this.toggleModal}/>)}
          {showBtnLoadMore && (<Button nextPage={this.onNextPage} />)}
          {showLoader && (<Loader />)}
        </Box>
      );
    }
  }
}

MakeImageGallery.propTypes = {
  imagesName: PropTypes.string.isRequired,
};

