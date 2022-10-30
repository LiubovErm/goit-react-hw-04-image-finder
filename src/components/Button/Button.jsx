import { ButtonLoadMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick, page }) => {
  
  return (
    <ButtonLoadMore type="button" onClick={() => {onClick(page + 1)}}>
      Load more
    </ButtonLoadMore>
  );
};


Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
