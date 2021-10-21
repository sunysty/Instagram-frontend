// PostModal 컴포넌트 (인스타그램 게시물 등록및 수정 모달페이지)

import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/image";
import { Grid, Image, Upload } from "../elements/index";
import apis from "axios";
import { Cookies } from "react-cookie";
import { history } from "../redux/configStore";

// 스타일
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const PostModal = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [contents, setContents] = useState("");
  const [preview, setPreview] = useState("http://via.placeholder.com/400x300");

  //리덕스에 저장한 값 다시 가져오기
  const preview_image = useSelector((state) => state.image.preview);

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

    //미리보기 리더
    const reader = new FileReader();
    reader.onload = (image_target) => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(image_target);
  };

  //textarea 변화시키는 함수
  const contentsChange = (e) => {
    setContents(e.target.value);
    dispatch(postActions.addPost(contentsChange));
  };

  return (
    <ModalContainer>
      <Container>
        <Grid is_flex>
          <Grid
            is_flex
            justify="space-between"
            height="50px"
            border="#eee 1px solid"
          >
            <ArrowBackIcon />
            <div>작성</div>
            <CloseIcon />
          </Grid>

          <Grid is_flex>
            <ImageContainer>
              <Container>
                <PreviewImage
                  shape="rectangle"
                  src={preview ? preview : "http://via.placeholder.com/400x300"}
                />
                <input
                  id="image"
                  ref={fileInput}
                  onChange={selectFile}
                  type="file"
                />
                {/* <label for="image">
                  <FileUploadIcon />
                </label> */}
              </Container>
            </ImageContainer>

            <TextContainer>
              <Container margin="0 auto">
                <Grid margin="-200px 0 0">
                  <Grid
                    is_flex
                    justify="flex-start"
                    padding="10px"
                    height="20px"
                  >
                    <AccountCircleIcon />
                    <div>13조화이링</div>
                  </Grid>
                  <Textarea
                    value={contents}
                    onChange={contentsChange}
                    label="게시글내용"
                    placeholder="설명을 입력하세요"
                  />
                </Grid>
                <Button onClick={addPost}>업로드</Button>
              </Container>
            </TextContainer>
          </Grid>
        </Grid>
      </Container>
    </ModalContainer>
  );
};

const Container = styled.section`
  box-sizing: border-box;
  margin: 0 auto;
  width: 1000px;
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  padding: 50px 0px;
  background-size: contain;
  width: 65%;
  display: flex;
  border: 1px solid #eee;
  height: 630px;
`;

const TextContainer = styled.div`
  background-size: contain;
  width: 35%;
  height: 630px;
  border: 1px solid #eee;
  box-sizing: border-box;
  margin: 0 auto;
`;

const Textarea = styled.textarea`
  width: 35%;
  height: 300px;
  padding: 10px;
  box-sizing: border-box;
  border: #eee 1px solid;
`;

const ModalContainer = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
`;

const PreviewImage = styled.img`
  width: 600px;
  height: 400px;
  padding: 25px;
`;

const Button = styled.button`
  background: #0097f9;
  width: 25%;
  box-sizing: border-box;
  color: #fff;
  border: none;
  padding: 10px;
  margin: 210px 5% 0;
  font-size: 15px;
  cursor: pointer;
`;

export default PostModal;
