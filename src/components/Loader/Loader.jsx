import { ColorRing } from  'react-loader-spinner'
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <ColorRing height="400" width="400" ariaLabel="blocks-loading"/>
    </LoaderWrapper>
  );
};