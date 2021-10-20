import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { actionCreators as userAction } from "../redux/modules/user";
import _ from "lodash";

import { TextField } from "@mui/material";
import styled from "styled-components";
import Button from "@mui/material/Button";

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [checkpwd, setCheckpwd] = React.useState("");

  //입력한 ID 값 가져오기
  const onChangeId = (e) => {
    setUsername(e.target.value);
    console.log(e.target.value);
  };
  //입력한 Name 값 가져오기
  const onChangeName = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };
  //입력한 Pwd 값 가져오기
  const onChangePwd = (e) => {
    setPwd(e.target.value);
    console.log(e.target.value);
  };
  //입력한 CheckPwd 값 가져오기
  const onChangeCheckPwd = (e) => {
    setCheckpwd(e.target.value);
  };
  //회원가입하기
  const signup = () => {
    if (pwd === checkpwd) {
      dispatch(userAction.setAccountMW(username, name, pwd));
    } else {
      alert("비밀번호가 같지 않습니다. 다시 한번 확인해주세요.");
    }
  };
  // //ID중복 확인하기
  // const idCheck = () => {
  //   dispatch(userAction.idCheckMW(username));
  // };

  //Enter키로 Button 이벤트 발생
  const signupKeyPress = (e) => {
    if (e.key == "Enter") {
      signup();
    }
  };
  return (
    <Wrap>
      <Container>
        <div>
          <Images src="https://fontmeme.com/images/instagram-new-logo.png" />
        </div>
        <Text>친구들의 사진과 동영상을 보려면 가입하세요.</Text>
        <InputBox>
          <TextField
            id="outlined-basic"
            label="아이디"
            variant="outlined"
            onChange={onChangeId}
            size="small"
            margin="dense"
            sx={{ width: "100%" }}
          />
          {/* <button onClick={idCheck}>아이디 중복확인</button> */}

          <TextField
            id="outlined-basic"
            label="성명"
            variant="outlined"
            size="small"
            onChange={onChangeName}
            margin="dense"
            sx={{ width: "100%" }}
          />

          <TextField
            id="outlined-basic"
            label="비밀번호"
            type="password"
            variant="outlined"
            size="small"
            onChange={onChangePwd}
            margin="dense"
            sx={{ width: "100%" }}
          />

          <TextField
            id="outlined-basic"
            label="비밀번호 확인"
            type="password"
            variant="outlined"
            size="small"
            onChange={onChangeCheckPwd}
            onKeyPress={signupKeyPress}
            margin="dense"
            sx={{ width: "100%" }}
          />
          <div>
            {username === "" || name === "" || pwd === "" || checkpwd === "" ? (
              <BlockedButton onClick={signup} disabled>
                로그인하기
              </BlockedButton>
            ) : (
              <AbleButton onClick={signup}>가입</AbleButton>
            )}
          </div>
        </InputBox>
      </Container>
      <LoginBox>
        계정이 있으신가요?
        <Button
          onClick={() => {
            history.push("/login");
          }}
          sx={{ margin: "-7px" }}
        >
          로그인
        </Button>
      </LoginBox>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 738px;
  background-color: #fafafa;
  padding-top: 40px;
`;
const Container = styled.div`
  border: 1px solid #dbdbdb;
  width: 350px;
  height: 460px;
  padding: 20px 0;
  margin: 0px auto 10px;
  background-color: white;
`;

const Images = styled.img`
  width: 200px;
  height: auto;
  margin: 0px auto 12px;
  display: block;
`;

const InputBox = styled.div`
  margin: 30px;
`;
const Text = styled.p`
  color: #8e8e8e;
  font-size: 17px;
  font-weight: 800;
  line-height: 20px;
  margin: 0 40px 10px;
  text-align: center;
`;
const AbleButton = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  background-color: #0691f3;
  border: 0px;
  color: white;
  font-weight: bold;
  border-radius: 3px;
  &:hover {
    background-color: #0089e9;
  }
`;
const BlockedButton = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  background-color: #b2defb;
  border: 0px;
  color: white;
  font-weight: bold;
  border-radius: 3px;
`;

const LoginBox = styled.div`
  border: 1px solid #dbdbdb;
  width: 350px;
  height: 70px;
  line-height: 70px;
  margin: auto;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
`;

export default SignUp;
