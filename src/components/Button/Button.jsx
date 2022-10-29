import { ButtonLoadMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ nextPage }) => (
  <ButtonLoadMore type="button" onClick={nextPage}>
    Load more
  </ButtonLoadMore>
);

Button.propTypes = {
  nextPage: PropTypes.func.isRequired,
};
