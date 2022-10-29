import { Component } from 'react';
import { Box } from './Box/Box';
import { SearchBar } from './SearchBar/SearchBar';
import { MakeImageGallery } from './ImageGallery/MakeImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
   state = {
    imagesName: '',
  };

  handleFormSubmit = imagesName => {
    this.setState({ imagesName });
  };

  render() {
    const { imagesName } = this.state;

    return (
      
      <Box>
        <SearchBar onSubmit={this.handleFormSubmit}/>
        <MakeImageGallery imagesName={imagesName} />
        <ToastContainer autoClose={2000}/>
      </Box>
    
    );
  }
}




