import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    is_header,
    type,
    flex,
    justify,
    width,
    height,
    max_hg,
    margin,
    padding,
    bg,
    border,
    overflow,
    _onClick,
    children,
  } = props;

  const styles = {
    is_flex: is_flex,
    is_header: is_header,
    flex: flex,
    justify: justify,
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    bg: bg,
    border: border,
    max_hg: max_hg,
    overflow: overflow,
  };

  if (type === "card") {
    return <CardGrid onClick={_onClick}>{children}</CardGrid>;
  }
  if (type === "modal") {
    return (
      <ModalGrid {...styles} onClick={_onClick}>
        {children}
      </ModalGrid>
    );
  }
  return (
    <DefaultGrid onClick={_onClick} {...styles}>
      {children}
    </DefaultGrid>
  );
};

Grid.defaultProps = {
  is_flex: false,
  is_header: false,
  flex: false,
  justify: "flex-start",
  width: "auto",
  height: "auto",
  margin: 0,
  padding: 0,
  bg: "transparent",
  border: "none",
  overflow: false,
  _onClick: () => {},
};

const CardGrid = styled.div`
  width: 600px;
  height: 250px;
  background-color: #f1f3f5;
  flex-wrap: wrap;
  position: relative;
`;

const ModalGrid = styled.div`
  position: relative;
  width: 35vw;
  height: ${(props) => (props.height ? props.height : "auto")};
  padding: 25px 30px;
  background-color: #f1f3f5;
  overflow-y: ${(props) => (props.overflow ? "auto" : "")};
  @media ${({ theme }) => theme.tablet} {
    width: 80vw;
  }
`;

const DefaultGrid = styled.div`
  ${(props) => (props.is_flex ? `display:flex` : "")};
  ${(props) => (props.justify ? `justify-content:${props.justify}` : "")};
  align-items: center;
  ${(props) => props.flex && `flex:1`};
  ${(props) => (props.width ? `width:${props.width}` : "")};
  ${(props) => (props.height ? `height:${props.height}` : "")};
  ${(props) => (props.margin ? `margin:${props.margin}` : "")};
  ${(props) => (props.padding ? `padding:${props.padding}` : "")};
  ${(props) => (props.bg ? `background-color:${props.bg}` : "")};
  ${(props) => (props.max_hg ? `max-height:${props.max_hg}` : "")};
  ${(props) => (props.overflow ? `overflow:${props.overflow}` : "")};
  ${(props) => props.border && `border:${props.border}`};
  flex-wrap: wrap;
  position: relative;
  @media ${({ theme }) => theme.tablet} {
    width: ${(props) => !props.is_header && `100%`};
    margin: ${(props) => (!props.is_header ? `0px` : "auto")};
  }
  /* @media ${({ theme }) => theme.mobile} {
    width: 100%;
  } */
`;

export default Grid;