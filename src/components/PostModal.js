// PostModal 컴포넌트 (인스타그램 게시물 등록및 수정 모달페이지)

import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Grid, Input, Textarea, Text, Upload } from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/image";
import apis from "axios";

const PostModal = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [contents, setContents] = useState("");

  //파일을 선택하는 함수
  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };

  //텍스트값을 저장하는 함수
  const contentsChange = (e) => {
    setContents(e.target.value);
    console.log(setContents(e.target.value), "텍스트값을 변경합니다");
  };

  //파일을 업로드하는 함수
  const fileUpload = (e) => {
    let formData= new FormData();
    // const formData = new FormData();
    // formData.append(file);
    // formData.append(contents);
    console.log(file, contents, "사진,글 업로드");

    dispatch(postActions.addPostAX(formData));
  };

  return (
    <ModalContainer>
      <div>
        {/* <img src={imageUrl}/> */}
        <input type="file" onChange={fileChange} accept=".gif, .jpg, .png" />
      </div>
      <textarea onChange={contentsChange} />
      <button onClick={fileUpload}>업로드</button>
    </ModalContainer>
  );
};

const ModalContainer = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
`;

export default PostModal;
