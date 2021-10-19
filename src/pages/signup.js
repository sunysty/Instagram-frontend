import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";

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
    <React.Fragment>
      <div>회원가입</div>
      <div>
        아이디
        <input onChange={onChangeId} placeholder="아이디" />
        <button onClick={idCheck}>아이디 중복확인</button>
      </div>
      <div>
        성명 <input onChange={onChangeName} placeholder="성명" />
      </div>
      <div>
        패스워드 <input onChange={onChangePwd} placeholder="비밀번호" />
      </div>
      <div>
        패스워드확인 <input />
      </div>
      <div>
        <button onClick={ClickSignup}>회원가입하기</button>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
