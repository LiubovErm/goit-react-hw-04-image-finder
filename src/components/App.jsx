import { useState } from 'react';
import { Box } from './Box/Box';
import { SearchBar } from './SearchBar/SearchBar';
import { MakeImageGallery } from './ImageGallery/MakeImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [imagesName, setImagesName] = useState('');
  
  const handleFormSubmit = imagesName => {
    setImagesName(imagesName);
  };

    return (
      
      <Box>
        <SearchBar onSubmit={handleFormSubmit}/>
        <MakeImageGallery findImage={imagesName} />
        <ToastContainer autoClose={2000}/>
      </Box>
    
    );
  }