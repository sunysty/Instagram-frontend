import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const SET_POST = 'SET_POST';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const EDIT_POST = 'EDIT_POST';

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post) => ({ post }));

const initialState = {
  list: [],
};

const addPostAX = (content, image, token, history) => {
  return function (dispatch) {
    let formData = new FormData();
    formData.append('username', token.username);
    formData.append('image', image);
    formData.append('content', content);

    const options = {
      url: 'http://withoh.shop/api/post',
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json;charset=UTF-8',
        'X-AUTH-TOKEN': token,
      },
      data: formData,
    };
    axios(options)
      .then((response) => {
        let post_list = {
          post_id: response.data.post_list.post_Id,
          content: response.data.post_list.content,
          image: response.data.post_list.image,
          createAt: response.data.post_list.createAt,
          comments: response.data.post_list.comment,
        };
        dispatch(addPost(post_list));
        window.alert('게시물 작성 완료');
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert('addPostAX 에러');
        }
      });
  };
};

const setPostAX = (token, history) => {
  return function (dispatch, getState) {
    const options = {
      url: 'http://withoh.shop/api/main',
      method: 'GET',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json;charset=UTF-8',
        // 'X-AUTH-TOKEN': token,
      },
    };
    axios(options)
      .then((response) => {
        let post_list = [];
        for (let i = 0; i < response.data.post_list.length; i++) {
          post_list.push({
            post_id: response.data.post_list[0].post_Id,
            content: response.data.post_list[0].content,
            image: response.data.post_list[0].image,
            comments: response.data.post_list[0].comment,
          });
        }
        dispatch(setPost(post_list));
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert('setPostAX 에러');
        }
      });
  };
};

const deletePostAX = (post_id, token) => {
  return function (dispatch) {
    const options = {
      url: 'http://withoh.shop/api/post',
      method: 'DELETE',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json;charset=UTF-8',
        'X-AUTH-TOKEN': token,
      },
      data: {
        post_Id: post_id,
      },
    };
    axios(options)
      .then((response) => {
        dispatch(deletePost(post_id));
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert('deletePostAX 에러');
        }
      });
  };
};

const editPostAX = (content, post_id, token) => {
  return function (dispatch) {
    const options = {
      url: 'http://withoh.shop/api/post',
      method: 'DELETE',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json;charset=UTF-8',
        'X-AUTH-TOKEN': token,
      },
      data: {
        post_Id: post_id,
        content: content,
      },
    };
    axios(options)
      .then((response) => {
        let post_list = {
          post_id: post_id,
          content: content,
        };
        dispatch(editPost(post_list));
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert('editPostAX 에러');
        }
      });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let new_post_list = draft.list.filter((v) => {
          if (v.comment_id !== action.payload.post_id) {
            return v;
          }
        });

        draft.list = new_post_list;
      }),

    // [EDIT_POST]: (state, action) => produce(state, (draft) => {
    // post_list의 data 중에서 post_id를 비교해서 일치하는경우의 idx를 알아냄
    // let idx = draft.list.findIndex((p) => p.post_id === action.payload.post.post_id);
    // draft.list[idx].content = action.payload.post.content
    // }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  deletePost,
  addPostAX,
  setPostAX,
  deletePostAX,
  editPostAX,
};

export { actionCreators };
