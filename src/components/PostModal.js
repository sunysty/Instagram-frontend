//PostModal (인스타그램 게시물 등록및 수정 모달페이지)
import React, { useRef } from 'react';
import styled from 'styled-components';
import { Grid, Input, Textarea } from '../elements/index';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as imageActions } from '../redux/modules/image';
const PostModal = (props) => {
  const is_uploading = useSelector((state) => state.image.uploading);
  //Input태그에 접근하기 위해 useRef()사용함
  const dispatch = useDispatch();
  const fileInput = useRef();
  //선택한 파일의 정보를 알수있음
  const selectFile = (e) => {
    let image = fileInput.current.files[0];
    console.log('미들웨어로 넘겨줄 파일객체');
    dispatch(imageActions.uploadImageFB(image)); //일단은...
  };
  return (
    <>
      {is_uploading ? (
        <Grid margin='0 auto'>업로드중</Grid>
      ) : (
        <Grid margin='0 auto'>업로드</Grid>
      )}
      <ModalContainer>
        <Grid is-flex>
          <div>뒤로가기</div>
          <div>작성</div>
          <div>close</div>
        </Grid>
        <Grid>
          <div>
            {/* 이미지 업로드 ::::: 파이어베이스 없이 미리보기 나오게 하는방법*/}
            <UploadForm type='file'>
              <input
                type='file'
                name='file'
                accept='.gif, .jpg, .png'
                onChange={selectFile}
                ref={fileInput}
                disabled=''
              />
              <textarea />
              <input type='submit' value='공유하기' />
            </UploadForm>
          </div>
        </Grid>
      </ModalContainer>
    </>
  );
};
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
`;
const UploadForm = styled.form``;
const Button = styled.button``;
export default PostModal;
