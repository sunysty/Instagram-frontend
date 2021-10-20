import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../configStore';
import axios from 'axios';
import { apis } from '../../shared/axios';

const SET_USER = 'SET_USER';
// const LOG_OUT = 'LOG_OUT';

const setUser = createAction(SET_USER, (user) => ({ user }));
// const logOut = createAction(LOG_OUT, (user) => ({user}));

const initialState = {
  user: {
    userName: null,
    profile_image: null,
  },
  is_login: false,
  is_loading: false,
};

const loginMiddleware = (loginInfo) => {
  return (dispatch, getstate, { history }) => {
    apis
      .login(loginInfo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        return console.log(err);
      });
  };
};

const signupMiddleware = (signupInfo) => {
  return () => {
    apis
      .signup(signupInfo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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

export default handleActions(
  {
    [SET_USER]: (state, action) => produce(state, (draft) => {}),
    // [LOG_OUT]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const userCreators = {
  signupMiddleware,
  loginMiddleware,
  idCheckMiddleware,
  setUser,
};

export { userCreators };
