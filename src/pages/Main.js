import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { Post, Header } from '../components/index';
import { history } from '../redux/configStore';

const Main = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.user.user);
  const post_data = useSelector((state) => state.post.list);

  React.useEffect(() => {
    if (post_data.length < 2) {
      dispatch(postActions.setPostAX(history));
    }
  }, []);

  return (
    <React.Fragment>
      <Container>
        <PostContainer>
          <Header />
          <Post />
          {/* 여러 게시글이 보이게 처리
          맵을 돌리면서 Post부터 그이하로 props로 데이터 전달 */}
          {post_data.map((p, idx) => {
            return (
              <Grid key={idx} margin='0px'>
                <Post {...p} />
              </Grid>
            );
          })}
        </PostContainer>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 30px;
  margin: 0 auto;
  max-width: 600px;
  position: relative;
  width: 100%;
`;

const PostContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 100%;
`;

export default Main;
