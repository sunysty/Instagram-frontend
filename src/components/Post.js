import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text, Input, Image } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configStore";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

const Post = (props) => {
  const dispatch = useDispatch();

  const post_list = useSelector((state) => state.post.list);
  const comment_list = useSelector((state) => state.comment.list);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [comment, setComment] = useState();

  const post_data = useSelector((state) => state.post.list);
  // let comment_count = props.comment.length;
  console.log(comment_list);

  // 댓글 보기 기능을 위한 Post_id 보내기
  // for (let i = 0; i < post_data.length; i++) {
  //   dispatch(commentActions.setCommentAX(post_data[i].post_id));
  // }

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const commentWrite = () => {
    // comment 작성 후에 input창을 비워줌
    setComment("");
    if (!comment) {
      window.alert("댓글 내용을 입력해주세요");
      return;
    }
    dispatch(commentActions.addCommentAX(props.post_id, comment, username));
  };

  const user = useSelector((state) => state.user);
  let username;
  if (user.user) {
    username = user.user.username;
  }

  const deletePost = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(postActions.deletePostAX(props.post_id));
    } else {
      return;
    }
  };

  return (
    <React.Fragment>
      {/* 내 게시물인 경우에만 수정, 삭제 */}
      <DetailContainer>
        <UserInfo>
          <Grid>
            {/* <Image
                cursor='pointer'
                _onClick={() => {
                  history.push('/profile');
                }}
                src={props.profile_image}
                shape='circle'
                size='36'
              ></Image> */}
            <Text bold>{props.username}</Text>
          </Grid>
          <Grid>
            <Text
              cursor="pointer"
              // _onClick={() => {
              //   PostEdit;
              // }}
            >
              수정
            </Text>
            <Text
              cursor="pointer"
              _onClick={() => {
                deletePost();
              }}
            >
              삭제
            </Text>
          </Grid>
        </UserInfo>
        <Grid>
          <Image src={props.image} shape="rectangle"></Image>
        </Grid>
        <Grid>
          <ChatBubbleOutlineIcon cursor="pointer" fontSize="large" />
          {/* <Text margin='0 0 0 4px'>{comment_count}</Text> */}
        </Grid>
        <Grid>
          <Grid>
            <Text>{props.createAt}</Text>
          </Grid>
          <Grid>
            <Text>{props.content}</Text>
          </Grid>
        </Grid>
        <Line />
        <Grid>
          <Grid>
            <InsertEmoticonIcon
              cursor="pointer"
              fontSize="large"
              onClick={() => {
                window.alert("준비 안됨");
              }}
            />
          </Grid>
          <Grid>{}</Grid>
          <Input
            value={comment}
            _onChange={(e) => {
              setComment(e.target.value);
            }}
            is_comment
          />
          <Grid>
            <Text _onClick={commentWrite} cursor="pointer">
              게시
            </Text>
          </Grid>
        </Grid>
      </DetailContainer>
    </React.Fragment>
  );
};

const DetailContainer = styled.div`
  margin: 0px 0px 40px 0px;
  border: 1px solid #dbdbdb;
  width: 100%;
  background-color: white;
`;

const UserInfo = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  padding: 14px;
`;

const Line = styled.hr`
  border: 1px solid #eee;
`;

export default Post;
