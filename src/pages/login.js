import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";

const LogIn = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = React.useState();
  const [pwd, setPwd] = React.useState();

  const onChangeID = (e) => {
    setUsername(e.target.value);
    console.log(e.target.value);
  };
  const onChangePwd = (e) => {
    setPwd(e.target.value);
    console.log(e.target.value);
  };
  const login = () => {
    dispatch(userAction.logInMW(username, pwd));
  };
  return (
    <React.Fragment>
      <div>로그인 페이지</div>
      <div>
        아이디
        <input onChange={onChangeID} />
      </div>
      <div>
        패스워드 <input onChange={onChangePwd} />
      </div>
      <div>
        <button onClick={login}>로그인하기</button>
      </div>
    </React.Fragment>
  );
};

export default LogIn;
