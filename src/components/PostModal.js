// PostModal 컴포넌트 (인스타그램 게시물 등록및 수정 모달페이지)

import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Grid, Input, Textarea, Text, Upload } from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import apis from "axios";

const PostModal = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [textarea, setTextarea] = useState("");

  //파일을 선택하는 함수
  const fileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  //텍스트값을 저장하는 함수
  const textareaChange = (e) => {
    setTextarea(e.target.value);
    console.log(textarea(e.target.value), "텍스트값을 변경합니다");
  };

  //파일을 업로드하는 함수
  const fileUpload = (e) => {
    const formData = new FormData();
    formData.append("선택한파일", selectedFile);
    formData.append("작성한글", textarea);
    console.log(selectedFile, textarea, "사진,글 업로드");
  };

  //사진url값을 이미지에 보여주는 함수
  const imageURL = (e) => {
    //서버에서 파일을 url로 변경해주면 다시 가져와서 그려줌
  }

  return (
    <ModalContainer>

      <div>
        {/* <img src={imageUrl}/> */}
        <input type="file" onChange={fileChange} accept=".gif, .jpg, .png" />
      </div>
      
      <textarea />
      <button onClick={fileUpload}>업로드</button>
      <button onClick={textareaChange}>텍스트테스트</button>
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
