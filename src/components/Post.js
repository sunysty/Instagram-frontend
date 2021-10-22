import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text, Input, Image } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configStore";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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
    window.location.reload();
  };

  const username = useSelector((state) => state.user);
  let user_name;
  if (username.user) {
    user_name = username.user.username;
  }

  //게시물삭제
  const deletePost = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(postActions.deletePostAX(props.post_id));
      window.location.reload();
    } else {
      return;
    }
  };

  return (
    <React.Fragment>
      {/* 내 게시물인 경우에만 수정, 삭제 */}
      <PostInner>
        <DetailContainer>
          <UserInfo>
            <Grid flex_row>
              <Image
                cursor="pointer"
                // _onClick={() => {
                //   history.push('/profile');
                // }}
                src="data:image/jpeg;base64,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"
                shape="circle"
                size="36"
              ></Image>
              <Text margin="12px 0px 4px 0px" bold>
                {props.username}
              </Text>
            </Grid>
            {/* <MoreHorizIcon cursor="pointer" /> */}
            {/* <Text
                cursor='pointer'
                _onClick={() => {
                  PostEdit;
                }}
              >
                수정
              </Text> */}
            <Text
              cursor="pointer"
              _onClick={() => {
                deletePost();
              }}
              width="30px"
            >
              삭제
            </Text>
          </UserInfo>
          <Grid>
            <Image src={props.image} shape="rectangle"></Image>
          </Grid>
          <Grid padding="20px 20px 0px 20px">
            <ChatBubbleOutlineIcon
              cursor="pointer"
              fontSize="large"
              // _onClick={PostDetail}
            />
            {/* <Text margin='0 0 0 4px'>{comment_count}</Text> */}
          </Grid>
          <Grid>
            <Grid>
              <Text>{props.createAt}</Text>
            </Grid>
            <Grid padding="0px 20px">
              <Text>{props.content}</Text>
            </Grid>
          </Grid>
          <Line />
          <ReplyBox>
            <Grid>
              <Grid flex_row margin="auto 10px">
                <Grid width="80%">
                  <Input
                    value={comment}
                    _onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    is_comment
                    padding="16px 4px"
                  />
                </Grid>
                <Grid width="20%">
                  <Textbutton onClick={commentWrite}>게시</Textbutton>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid>
            <Text _onClick={commentWrite} cursor='pointer'>
              게시
            </Text>
          </Grid> */}
          </ReplyBox>
        </DetailContainer>
      </PostInner>
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

const ReplyBox = styled.div`
  padding: 5px 20px 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostInner = styled.div`
  width: 600px;
  margin: auto;
  @media (max-width: 600px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Textbutton = styled.div`
  font-size: 15px;
  color: #0095f6;
  cursor: pointer;
  text-align: center;
  margin: 0px 0px 0px 6px;
  align-items: center;
  line-height: 40px;
`;

export default Post;
