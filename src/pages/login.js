import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { actionCreators as userAction } from "../redux/modules/user";

import styled from "styled-components";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const LogIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const onChangeID = (e) => {
    setUsername(e.target.value);
  };
  const onChangePwd = (e) => {
    setPwd(e.target.value);
  };
  const login = () => {
    dispatch(userAction.logInMW(username, pwd));
  };
  const loginKeyPress = (e) => {
    if (e.key == "Enter") {
      login();
    }
  };

  return (
    <React.Fragment>
      <Wrap>
        <Image src="img/instarPicture.png" />
        <BoxGrid>
          <Container>
            <div>
              <Logo src="https://fontmeme.com/images/instagram-new-logo.png" />
            </div>
            <InputBox>
              <TextField
                id="outlined-basic"
                label="아이디"
                variant="outlined"
                onChange={onChangeID}
                size="small"
                margin="dense"
                sx={{ width: "100%" }}
              />

              <TextField
                id="outlined-basic"
                type="password"
                label="비밀번호"
                variant="outlined"
                onChange={onChangePwd}
                size="small"
                margin="dense"
                sx={{ width: "100%" }}
                onKeyPress={loginKeyPress}
              />

              <div>
                {username === "" || pwd === "" ? (
                  <BlockedButton onClick={login} disabled>
                    로그인하기
                  </BlockedButton>
                ) : (
                  <AbleButton onClick={login}>로그인하기</AbleButton>
                )}
              </div>
            </InputBox>
          </Container>
          <LoginBox>
            계정이 있으신가요?
            <Button
              onClick={() => {
                history.push("/signup");
              }}
              sx={{ margin: "-7px" }}
            >
              가입하기
            </Button>
          </LoginBox>
        </BoxGrid>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 620px;
  background-color: #fafafa;
  padding: 30px 0px;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const Container = styled.div`
  border: 1px solid #dbdbdb;
  width: 350px;
  height: 400px;
  padding: 20px 0;
  margin: 0px 20px 30px;
  background-color: white;
`;
const BoxGrid = styled.div`
  display: flex;
  flex-direction: column;
`;
const Logo = styled.img`
  width: 200px;
  height: auto;
  margin: 0px auto 12px;
  display: block;
`;
const Image = styled.img`
  width: 400px;
  height: 610px;
`;

const InputBox = styled.div`
  margin: 30px;
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
  margin: -10px 20px;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
`;

export default LogIn;
