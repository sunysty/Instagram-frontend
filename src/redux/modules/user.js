import { createAction, handleActions } from 'redux-actions';
import { apis } from '../../shared/axios';
import { Cookies } from 'react-cookie';
import { produce } from 'immer';
import { history } from '../configStore';
import axios from 'axios';

//Action
const SET_USER = 'SET_USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialState = {
  user: {
    userName: null,
    profile_image: null,
  },
  is_login: false,
  is_loading: false,
};

//Action Creator
const setUser = createAction(SET_USER, (user) => ({ user }));
const logIn = createAction(LOGIN, (user) => ({ user }));

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
        if (res.data.result === 'success') {
          dispatch(setUser(user));
          alert(res.data.data);
          history.push('/login');
        } else if (res.data.result === 'failed') {
          alert(res.data.data);
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
        if (res.data.result === 'success') {
          cookies.set('token', res.data.data);
          cookies.set('is_login', true);
          dispatch(logIn(res.data.data.username));
          history.replace('/');
        } else if (res.data.result === 'failed') {
          alert(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

const idCheckMiddleware = (userName) => {
  return () => {
    apis
      .idCheck(userName)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
        draft.is_login = true;
        console.log(state);
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  logIn,
  setAccountMW,
  logInMW,
  idCheckMiddleware,
};

export { actionCreators };
