import React, { useState } from "react";
//컴포넌트
import DetailModal from "./DetailModal";
import PostModal from "./PostModal";
// 스타일링
import styled from "styled-components";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import SendIcon from "@material-ui/icons/Send";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
//훅
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const Post = (props) => {
  const dispatch = useDispatch();
  // const is_login = useSelector((state) => state.user.is_login);
  const [comments, setComments] = useState();
  const [is_modal, setDetailModal] = useState();
  const [is_changemodal, setChangeModal] = useState();
  const submit = comments ? true : false;

  // const is_me = useSelector((state) => state.user.user.userName); // 로그인한 사용자
  // const userInfo = useSelector((state) => state.user.user);
  const comment_list = useSelector((state) => state.comment.list[props.id]);
  const is_comment = comment_list ? true : false;
  // const idx = props.like_id.findIndex((l) => l === userInfo.userName);  // 좋아요
  // const is_like = idx !== -1 ? true : false;

  React.useEffect(() => {
    dispatch(commentActions.getCommentAX(props.id));
  }, []);

  // 댓글, 모달창 제어함수
  const selectComment = (e) => {
    console.log(e.target.value);
    setComments(e.target.value);
  };

  const openDetailModal = () => {
    setDetailModal(true);
  };

  const closeDetailModal = () => {
    setDetailModal(false);
  };

  const openChangeModal = () => {
    setChangeModal(true);
  };

  const closeChangeModal = () => {
    setChangeModal(false);
  };

  const addComment = () => {
    console.log(comments);
    let commentInfo = {
      comment: comments,
      // userName: userInfo.userName,
    };

    dispatch(commentActions.addCommentAX(commentInfo, props.id));
    setComments("");
  };

  const deleteComment = (id) => {
    console.log(id);
    console.log("삭제");
    dispatch(commentActions.deleteCommentAX(id, props.id));
  };

  const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 24) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  return (
    <React.Fragment>
      <PostInner>
        <PostBox>
          <PostHeader>
            <PostHeaderLeft>
              <ProfileCircle src={props.profile_image} />
              <PostAuthor>{props.userName}</PostAuthor>
            </PostHeaderLeft>
            {/* 로그인한 사용자와 작성자가 같다면 수정/삭제 모달을 띄우는 버튼이 보이게 한다. */}
            {/* {props.userName === is_me ? (
              <MoreHorizIcon
                height='14px'
                width='14px'
                cursor='pointer'
                // onClick={}
              />
            ) : null} */}
          </PostHeader>
          <PostBody>
            <PostImage src={props.image} />
          </PostBody>
          <ButtonIcons>
            <TwoIcons>
              <CloudQueueIcon
                padding-left="16px"
                padding-right="16px"
                onClick={openDetailModal}
              />
              <SendIcon padding-left="16px" />
            </TwoIcons>
            <BookmarkBorderIcon cursor="pointer" />
          </ButtonIcons>
          <BottomAuthorCmtBox>
            <AuthorCmtBox>
              <Author>{props.userName}</Author>
              <Comments>{props.content}</Comments>
            </AuthorCmtBox>
          </BottomAuthorCmtBox>
          {/* 메인 페이지의 게시글의 댓글란의 댓글이 최대 2개만 보이게해서 창이 고정되게 한다. */}
          {is_comment
            ? comment_list.map((c, idx) => {
                if (idx < 2) {
                  return (
                    <ReplyBox>
                      {/* {c.userName === userInfo.userName ? (
                        <DeleteBtn
                          onClick={() => {
                            deleteComment(c.id);
                          }} */}
                      {/* >
                          <DeleteForeverIcon />
                        </DeleteBtn>
                      ) : null} */}
                    </ReplyBox>
                  );
                }
              })
            : null}
          <InsertTime>{timeForToday(props.insert_dt)}</InsertTime>
          <CommentInputBox>
            <CommentInput
              type="text"
              placeholder="댓글달기..."
              onChang={selectComment}
              value={comments}
            ></CommentInput>
            {submit ? (
              <UploadBtn onClick={addComment}>게시</UploadBtn>
            ) : (
              <UploadBtn style={{ opacity: "0.3" }}>게시</UploadBtn>
            )}
          </CommentInputBox>
        </PostBox>
      </PostInner>
    </React.Fragment>
  );
};

Post.defaultProps = {
  id: null,
  userInfo: {
    userName: "",
    userProfile: "",
  },
  profile_image: "",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvym74Wxodxh3tgGdKabNesjo2-qYASOHpMTNQepHe1-w2B8IkksvY6c5iBUINMmn_FiA&usqp=CAU",

  replyInfo: {
    userName: "hh99",
    reply_input: "예쁘네요",
    reply_cancel: "",
    reply_dt: "2021-10-20 09:00:32",
    is_me: false,
  },
  content: "13조 클론코딩",
  insert_dt: "2021-10-20 11:00:32",
};

const PostInner = styled.div`
  width: 935px;
  margin: auto;
  @media (max-width: 935px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const PostBox = styled.div`
  width: 614px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  box-sizing: border-box;
  margin-bottom: 60px;
  background: white;
  // max-width: 614px;
  @media (max-width: 614px) {
    width: 100vw;
  }
`;

const PostHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  box-sizing: border-box;

  @media (max-width: 614) {
    width: 100%;
    heigth: 100%;
  }
`;

const PostHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileCircle = styled.div`
  height: 32px;
  width: 32px;
  margin: 0px 14px 0px 0px;
  border-radius: 50%;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  cursor: pointer;
`;

const PostAuthor = styled.div`
  height: auto;
  width: auto;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const PostBody = styled.div`
  overflow: hidden;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  background-size: cover;
  cursor: pointer;
`;

const ButtonIcons = styled.div`
  height: 40px;
  margin: 4px 0px 0px 0px;
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TwoIcons = styled.div`
  height: 24px;
  width: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomAuthorCmtBox = styled.div`
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorCmtBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Author = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding-right: 10px;
`;

const Comments = styled.div`
  font-size: 14px;
`;

const ReplyBox = styled.div`
  padding: 5px 20px 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Reply = styled.div`
  font-size: 14px;
`;

const DeleteBtn = styled.button`
  height: 12px;
  width: 12px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  margin-right: 15px;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
`;

const InsertTime = styled.div`
  font-size: 10px;
  color: #999;
  border-bottom: 1px solid #efefef;
  padding: 16px;
`;

const CommentInputBox = styled.div`
  width: 100%;
  height: 56px;
  margin-top: 4px;
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  /* background-size: cover;
  position: relative; */
`;

const CommentInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 90%;
`;

const UploadBtn = styled.div`
  font-size: 14px;
  color: #3897f0;
  cursor: pointer;
  opacity: 1;
  font-weight: 600;
`;

export default Post;
