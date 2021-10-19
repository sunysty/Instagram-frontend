import React from 'react';
import styled from 'styled-components';
const Image = (props) => {
  const { width, height, src } = props;
  const styles = {
    width: width,
    height: height,
  };
  return <ImageWrap {...styles} src={src} />;
};
Image.defaultProps = {
  width: '100%',
  height: 'auto',
};
const ImageWrap = styled.img`
  width: ${(props) => props.width && `${props.width}`};
  height: ${(props) => props.height && `${props.height}`};
  object-fit: cover;
`;
export default Image;
