import styled from 'styled-components';

export const ButtonLoadMore = styled.button`
  cursor: pointer; 
  display: block;
  margin: 15px auto;
  width: 180px;
  height: 40px;
  border: none;
  background-color: ${props => props.theme.colors.green};
  color:${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radii.normal};
  
  &:hover,
  &:focus {
    box-shadow: ${props => props.theme.shadows.normal};
  }
`;