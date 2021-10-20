import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { Grid, Container } from '../elements/index';
import { BsPlusSquareFill } from 'react-icons/bs';
import { RiHome2Fill } from 'react-icons/ri';
const Header = () => {
  return (
    <>
      <Container>
        <Grid is_flex justify='space-around'>
          <img
            src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcvNA5Y%2Fbtrh9MegDW8%2F1gC0biXyIKWYC9x2MpRGLK%2Fimg.png'
            width='103px'
            height='39px'
          ></img>
          <div>
            <Grid is_flex justify='space-between' width='100px'>
              <RiHome2Fill />
              <BsPlusSquareFill />
            </Grid>
          </div>
        </Grid>
      </Container>
    </>
  );
};
export default Header;
