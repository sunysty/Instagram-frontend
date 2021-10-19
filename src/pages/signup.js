import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";

import { TextField } from "@mui/material";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";

const SignUp = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

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
          <Images src="https://fontmeme.com/images/instagram-new-logo.png" />
        </div>
        <Text>친구들의 사진과 동영상을 보려면 가입하세요.</Text>
        <Grid>
          <TextField
            id="outlined-basic"
            className={classes.TextField}
            label="아이디"
            variant="outlined"
            onChange={onChangeId}
            size="small"
          />
          {/* <button onClick={idCheck}>아이디 중복확인</button> */}

          <TextField
            id="outlined-basic"
            className={classes.TextField}
            label="성명"
            variant="outlined"
            size="small"
            onChange={onChangeName}
          />

          <TextField
            id="outlined-basic"
            className={classes.TextField}
            label="비밀번호"
            variant="outlined"
            size="small"
            onChange={onChangePwd}
          />

          <TextField
            id="outlined-basic"
            className={classes.TextField}
            label="비밀번호 확인"
            variant="outlined"
            size="small"
          />
        </Grid>
        <div>
          <button onClick={ClickSignup}>회원가입하기</button>
        </div>
      </Container>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 738px;
  background-color: #fafafa;
`;
const Container = styled.div`
  border: 1px solid #dbdbdb;
  width: 350px;
  height: 600px;
  padding: 30px 0;
  margin: 30px auto 10px;
  background-color: white;
`;

const Images = styled.img`
  width: 200px;
  height: auto;
  margin: 10px auto 12px;
  display: block;
`;

const Inputs = styled.div`
  margin: 10px auto;
`;
const Text = styled.p`
  color: #8e8e8e;
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  margin: 0 40px 10px;
  text-align: center;
`;

const useStyles = makeStyles({
  TextField: {
    width: "80%",
  },
});

export default SignUp;
