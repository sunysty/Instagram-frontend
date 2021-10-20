// PostModal 컴포넌트 (인스타그램 게시물 등록및 수정 모달페이지)

import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Grid, Input, Textarea, Text, Upload } from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/image";
import apis from "axios";
import { Cookies } from "react-cookie";
import { history } from "../redux/configStore";

const PostModal = () => {
  const previewImage = useSelector((state) => state.image.preview);
  const dispatch = useDispatch();

  const [preview, setPreview] = useState("http://via.placeholder.com/400x300");
  const [image, setImage] = useState("");
  const [value, setValue] = useState("");
  const [contents, setContents] = useState("");

  const addPost = (props) => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    //const token 해주기
    if (token) {
      dispatch(postActions.addPostAX(contents, image, token, history));
    } else if (!token) {
      window.alert("로그인상태가 아닙니다!");
      return;
    } else if (!contents) {
      window.alert("내용을 입력해주세요!");
      return;
    }
  };

  // const contentsChange = (e) => {
  //   setContents(e.target.value);
  // };

  const fileInput = React.useRef();

  //input에서 이미지를 선택할때 실행되는 onChange함수
  const selectFile = (e) => {
    //file state에 현재 상태를 저장
    const image_target = e.target.files[0];
    const imageUrl = URL.createObjectURL(image_target);
    setImage(imageUrl);

    const reader = new FileReader();
    reader.onload = (image_target) => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(image_target);

    console.log(reader, "리더");
    console.log(image_target, "타겟이미지");
    console.log(image, "이미지");
  };

  console.log(image, "image스테이트에 저장된 값이 뭐라고뜨나요?");
  console.log(preview, "결과값");

  //textarea 변화시키는 함수
  const contentsChange = (e) => {
    setContents(e.target.value);
    dispatch(postActions.addPost(contentsChange));
  };

  /*
  //파일을 업로드하는 함수
  const postUpload = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("contents", contents);

    dispatch(postActions.addPost(formData));
  };
  */

  return (
    <ModalContainer>
      <Container>
        <ImageContainer>
          <Grid>
            <div>작성</div>
            <input
              id="image"
              ref={fileInput}
              onChange={selectFile}
              type="file"
            />
          </Grid>
          <Grid>
            <PreviewImage
              shape="rectangle"
              src={
                previewImage
                  ? previewImage
                  : "http://via.placeholder.com/400x300"
              }
            />
          </Grid>
        </ImageContainer>
        <TextContainer>
          <Grid>
            <textarea
              value={contents}
              onChange={contentsChange}
              label="게시글내용"
              placeholder="게시글을 작성해주세요"
            />
          </Grid>
        </TextContainer>
      </Container>
      <button onClick={addPost}>업로드</button>
    </ModalContainer>
  );
};

const Container = styled.section`
  box-sizing: border-box;
  padding-top: 100px;
  margin: 0 auto;
  width: 100%;
  position: relative;
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  padding: 10px 0px;
  background-size: contain;
  width: 100%;
  display: flex;
`;

const TextContainer = styled.div`
  padding: 10px 0px;
  background-size: contain;
  width: 100%;
  display: flex;
`;

const ModalContainer = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
`;

const PreviewImage = styled.image`
  width: 200px;
  height: 200px;
`;

export default PostModal;
