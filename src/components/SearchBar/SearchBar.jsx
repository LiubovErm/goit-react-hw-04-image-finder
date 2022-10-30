import { useState } from 'react';
import { Form, Input, Button } from './SearchBar.styled'
import { FiSearch } from "react-icons/fi";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  const [imagesName, setImagesName] = useState('');
  
  const handleImageChange = event => {
    const { value } = event.target;
    setImagesName(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (imagesName.trim() === '') {
      toast.error('Треба щось ввести');
      return;
    }
    onSubmit(imagesName);
    setImagesName('');
  };
    
    return (
        <Form onSubmit={handleSubmit}>
         <Input
            type="text"
            name="imageName"
            onChange={handleImageChange}
            autoComplete="off"
            value={imagesName}
            placeholder="Я шукаю..."
          />
           <Button type="submit">
              <FiSearch size="20" />
          </Button>
        </Form>
      
    );
  }


SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};