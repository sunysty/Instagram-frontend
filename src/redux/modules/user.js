import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import { apis } from "../../shared/axios";
import { Cookies } from "react-cookie";

//Action
const SET_USER = "SET_USER";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const CHECK_ID = "CHECK_ID";

const initialState = {
  is_login: false,
  user: {
    username: "rlarkqals",
    name: "gabmin",
    pwd: "1234",
  },
};

//Action Creator
const setUser = createAction(SET_USER, (user) => ({ user }));
const logIn = createAction(LOGIN, (user) => ({ user }));
const checkId = createAction(CHECK_ID, (username) => ({ username }));

//회원가입 등록
const setAccountMW = (username, name, pwd) => {
  return function (dispatch, getState, { history }) {
    const user = {
      username: username,
      name: name,
      pwd: pwd,
    };
    apis
      .getAccountAX(user)
      .then((res) => {
        if (res.result === "success") {
          dispatch(setUser(user));
          alert(res.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

//로그인
const logInMW = (username, pwd) => {
  return function (dispatch, getState, { history }) {
    const user = {
      username: username,
      pwd: pwd,
    };
    const cookies = new Cookies();
    apis
      .logInAX(user)
      .then((res) => {
        if (res.data.result === "success") {
          cookies.set("token", res.data.data);
          dispatch(logIn(user));
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

//아디디 중복 확인
const idCheckMW = (username) => {
  return function (dispatch, getState, { history }) {
    apis
      .getIdCheckAX(username)
      .then((res) => {
        dispatch(checkId(res.data.result));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

//Reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // const newAccount = {
        //   username: action.payload.username,
        //   name: action.payload.name,
        //   pwd: action.payload.pwd,
        // };
        // draft.user = { ...draft.user, newAccount };
        draft.user = action.payload.user;
      }),
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  logIn,
  setAccountMW,
  logInMW,
  checkId,
  idCheckMW,
};

export { actionCreators };
