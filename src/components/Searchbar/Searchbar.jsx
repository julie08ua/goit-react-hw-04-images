import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import {Form, Header, Button, Input} from './Searchbar.styled';

export const Searchbar = ({onSubmit}) => {
  const [text, setText] = useState('');

  const handleSearch = ({ currentTarget: { value } }) => {
    setText(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!text.trim()) {
      return toast.warn('Please, enter a search query');
    }
    onSubmit(text); 
    setText('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
            <BsSearch/>
        </Button>

        <Input
          type="text"
          name="text"
          value={text}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearch}
        />
      </Form>
    </Header>
  );
}
        
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};