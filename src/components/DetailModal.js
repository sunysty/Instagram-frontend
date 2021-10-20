import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { actionCreators as commentActions } from '../redux/modules/comment';

const DetailModal = (props) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState();
  const submit = comments ? true : false;
  console.log(props);
  const selectComment = (e) => {
    console.log(e.target.value);
    setComments(e.target.value);
  };

  const addComment = () => {
    console.log(comments);
    let commentInfo = {
      comment: comments,
      userName: props.userName,
      // 프로필 (마이페이지) 만들게되면 url 삽입
    };
    dispatch(commentActions.addCommentAX(commentInfo, props.id));
    setComments('');
  };
  return (
    <React.Fragment>
      <Component onClick={props.close} />
      <ExitContainer>
        <ExitButton onClick={props.close}>
          <CloseIcon fontSize='large' />
        </ExitButton>
      </ExitContainer>

      <ModalComponent>
        <ModalImg src={props.image} />
        <ModalRightContainer>
          <ModalHeader>
            <ModalLeftHeader>
              <ProfileCircle src={props.image} />
              <ModalAuthor>{props.userName}</ModalAuthor>
            </ModalLeftHeader>
            {props.userName === props.is_me ? (
              <ModalRightHeader onClick={props.openChangeModal}>
                <MoreHorizIcon height='14px' width='14px' cursor='pointer' />
              </ModalRightHeader>
            ) : null}
          </ModalHeader>

          <ModalCmtBox>
            {props.is_comment
              ? props.comment_list.map((c, idx) => {
                  return (
                    <ModalCmt>
                      <ProfileCircle src={c.profile_url} />
                      <ModalCmtRight>
                        <div>
                          <ModalAuthor>{c.userName}</ModalAuthor>
                          {c.comment}
                        </div>
                        {c.userName === props.userName ? (
                          <CmtDeleteBtn
                            onClick={() => {
                              props.deleteComment(c.id);
                            }}
                          >
                            <DeleteForeverIcon />
                          </CmtDeleteBtn>
                        ) : null}
                      </ModalCmtRight>
                    </ModalCmt>
                  );
                })
              : null}
          </ModalCmtBox>
          <ModalCmtInputBox>
            <ModalCmtInput
              type='text'
              placeholder='댓글달기...'
              onChange={selectComment}
              value={comments}
            />
            {submit ? (
              <ModalUpload onClick={addComment}>게시</ModalUpload>
            ) : (
              <ModalUpload style={{ opacity: '0.3' }}>게시</ModalUpload>
            )}
          </ModalCmtInputBox>
        </ModalRightContainer>
      </ModalComponent>
    </React.Fragment>
  );
};

const Component = styled.div`
  position: fixed;
  top: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: balck;
  z-index: 10;
`;

const ModalComponent = styled.div`
  position: fixed;
  width: 950px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 20;
  display: flex;
  @media (max-width: 950px) {
    width: 350px;
  }
  @media (max-width: 350px) {
    width: 100%;
  }
`;

const ExitContainer = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  right: 0;
  padding: 12px;
`;

const ExitButton = styled.button`
  cursor: pointer;
  color: white;
  background-color: transparents;
  border: none;
  outline: none;
  font-size: 14px;
`;

const ModalImg = styled.img`
  width: 600px;
  height: 600px;
  @media (max-width: 950px) {
    display: none;
  }
`;

const ModalRightContainer = styled.div`
  width: 350px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid #efefef;
`;

const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #efefef;
  display: flex;
  align-item: center;
  justify-content: space-between;
`;

const ModalLeftHeader = styled.div`
  display: flex;
  align-items: center;
`;

const ModalRightHeader = styled.div`
  cursor: pointer;
`;

const ProfileCircle = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-size: cover;
  margin-right: 10px;
`;

const ModalAuthor = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-right: 5px;
`;

const ModalCmtInputBox = styled.div`
  width: 100%;
  height: 56px;
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #efefef;
`;

const ModalCmtInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 80%;
`;

const ModalUpload = styled.div`
  font-size: 14px;
  color: #3897f0;
  cursor: pointer;
  font-weight: 600;
`;

const ModalCmtBox = styled.div`
  padding: 0px 16px;
  margin-right: 0px;
  display: flex;
  flex-direction: columns;
  height: 480px;
  // 댓글이 많으면 스크롤로 아래부분이 위로 올라가게 하면서 댓글이 보여지게끔 함
  overflow-y: scroll;
  :: -webkit-scrollbar {
    display: none;
  }
`;

const ModalCmt = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ModalCmtRight = styled.div`
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
`;

const CmtDeleteBtn = styled.button`
  height: 12px;
  width: 12px;
  cursor: pointer;
  background-color: transparents;
  border: none;
  outline: none;
  margin-right: 15px;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
`;

export default DetailModal;
