import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { useHistory } from "react-router-dom";
import { Grid, Container } from "../elements/index";
import PostModal from "../components/PostModal";
import Main from "../pages/Main";
const Header = () => {
  const history = useHistory();
  return (
    <>
      <Container>
        <Grid is_flex justify="space-around">
          <img
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcvNA5Y%2Fbtrh9MegDW8%2F1gC0biXyIKWYC9x2MpRGLK%2Fimg.png"
            width="103px"
            height="39px"
          ></img>
          <div>
            <div
              onClick={() => {
                history.push("/");
              }}
            >
              Home
            </div>
            <div height="39px">PostModal</div>
          </div>
        </Grid>
      </Container>
    </>
  );
};
export default Header;
