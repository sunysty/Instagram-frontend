import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";

import TextField from "@mui/material/TextField";
import styled from "styled-components";

const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = React.useState();
  const [name, setName] = React.useState();
  const [pwd, setPwd] = React.useState();

  const onChangeId = (e) => {
    setUsername(e.target.value);
    console.log(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };
  const onChangePwd = (e) => {
    setPwd(e.target.value);
    console.log(e.target.value);
  };

  const ClickSignup = () => {
    dispatch(userAction.setAccountMW(username, name, pwd));
  };

  const idCheck = () => {
    dispatch(userAction.idCheckMW(username));
  };

  return (
    <Wrap>
      <Container>
        <div>
          <img src="https://fontmeme.com/images/instagram-new-logo.png" />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="아이디"
            variant="outlined"
            onChange={onChangeId}
          />
          <button onClick={idCheck}>아이디 중복확인</button>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="성명"
            variant="outlined"
            onChange={onChangeName}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="비밀번호"
            variant="outlined"
            onChange={onChangePwd}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="비밀번호 확인"
            variant="outlined"
          />
        </div>
        <div>
          <button onClick={ClickSignup}>회원가입하기</button>
        </div>
      </Container>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fafafa;
`;
const Container = styled.div`
  border: 1px solid #dbdbdb;
  width: 30%;
  height: 70%;
  padding: 2em;
`;

export default SignUp;
