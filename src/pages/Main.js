import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid, Container, Image, Text } from "../elements";
import { Post, Header } from "../components";

const Main = () => {
  return (
    <React.Fragment>
      <Container>
        <Header />
        <Post />
      </Container>
    </React.Fragment>
  );
};

export default Main;
