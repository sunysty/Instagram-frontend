import React from "react";
import styled from "styled-components";

const Container = (props) => {
  const { height, margin, children } = props;
  const styles = {
    height: height,
    margin: margin,
  };
  return (
    <>
      <ContainerWrap {...styles}>{children}</ContainerWrap>
    </>
  );
};
Container.defaultProps = {
  height: "auto",
  margin: "0 auto",
};
const ContainerWrap = styled.div`
  width: 1000px;
  ${(props) => (props.height ? `height:${props.height}` : "auto")};
  ${(props) => (props.margin ? `margin:${props.margin}` : "0 auto")};
  @media ${({ theme }) => theme.tablet} {
    width: 100%;
    padding: 0px 20px;
  }
  @media ${({ theme }) => theme.mobile} {
    padding: 0px 15px;
  }
`;
export default Container;
