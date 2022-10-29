import styled from 'styled-components';

export const ImageList = styled.ul`
  list-style: none;
  margin: 0 auto;
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 80px;
  margin-bottom: 30px;
`;

export const RejectedBox = styled.img`
  display: block;
  width: 100%;
`;