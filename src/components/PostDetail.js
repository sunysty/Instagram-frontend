import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as commentActions } from '../redux/modules/comment';
import CommentItem from './CommentItem';
import { history } from '../redux/configStore';
import { actionCreators as postActions } from '../redux/modules/post';

const PostDetail = (props) => {
  const post_data = useSelector((state) => state.post.list);
  const comment_list = useSelector((state) => state.comment.list);
  let url = document.location.href.split('/');
  let post_id = url[url.length - 1];

  const dispatch = useDispatch();
  // post리덕스의 게시글 정보 중에서 현재 게시글만 보여주기 위해 필터링
  const checkPost = (e) => {
    if (e.post_id == post_id) {
      return true;
    }
  };

  const thisPost = post_data.filter(checkPost);

  React.useEffect(() => {
    dispatch(postActions.setPostAX(history));
    dispatch(commentActions.setCommentAX(post_id));
  }, []);

  return (
    <React.Fragment>
      <DetailContainer>
        {thisPost.map((v) => {
          return <Post key={v.post_id} {...v} />;
        })}
        <CommentContainer>
          {comment_list.map((v) => {
            return <CommentItem post_id={post_id} key={v.comment_id} {...v} />;
          })}
        </CommentContainer>
      </DetailContainer>
    </React.Fragment>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: auto;
  max-width: 800px;
  margin: 50px auto;
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

const CommentContainer = styled.div`
  width: 100%;
  margin-top: -30px;
  height: auto;
  background-color: white;
`;

export default PostDetail;
