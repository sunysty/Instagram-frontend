import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import 'moment';
import moment from 'moment';
import user from './user';
import comment from './comment';

// 목록 redux
const SET_POST = 'SET_POST';

// 추가
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';
const NEW_COMMENT = 'NEW_COMMENT';
const OLD_COMMENT = 'OLD_COMMENT';
// const LOADING = 'LOADING';

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (userName) => ({ userName }));
// const loading = createAction(LOADING, (post, post_id) => ({ post, post_id }));
const newComment = createAction(NEW_COMMENT, (commentInfo) => ({
  commentInfo,
}));
const oldComment = createAction(OLD_COMMENT, (commentInfo) => ({
  commentInfo,
}));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {
  contents: '',
  userName: '',
  insert_dt: '',
  image: '',
  profile_image: '',
};

// 작성한 게시글을 서버에 보내는 작업
// 첨부한 사진은 url만 받아서 서버로
// 게시글 작성자 데이터와 게시글 내용을 서버에
// 그 후에 response로 게시물 id를 받아서 redux store에 게시물 데이터와 같이 저장

const addPostAX = (post) => {
  return function (dispatch, getState, { history }) {
    // formdata에 파일과 게시글 내용을 담아 서버로 전송
    let formData = new FormData();
    // formData.append("file", file);
    // formData.append("content", contents);

    const options = {
      url: '/api/upload',
      method: 'POST',
      data: formData,
    };
    axios(options)
      .then((res) => {
        console.log(res.data);
        // 방금 업데이트 된 포스트 정보를 받아 정리
        let post_list = {
          post_id: res.data.post_list.userName,
          content: res.data.post_list.contents,
          image: res.data.post_list.image,
          profile_image: res.data.post_list.profile_image,
          comments: res.data.post_list.comments,
        };
        console.log(post_list);
        // redux 상태 업데이트
        dispatch(addPost(post_list));
        window.alert('게시물 작성이 완료되었습니다.');
        history.push('/main');
      })
      .catch((err) => {
        console.log(err);
        if (err.res) {
          window.alert('오류메세지');
        }
      });

    // const userInfo = {
    //   userName: _user.userName,
    //   profile_image: _user.profile_image,
    // };

    // let _post = {
    //   contents: post.contents,
    //   insertDt: moment().format('YYYY-MM-DD HH:mm:ss'),
    // };
  };
};

const getAllPostAX = (history) => {
  return function (dispatch, getState) {
    const options = {
      url: '/api/post',
      method: 'POST',
    };
    axios(options)
      .then((res) => {
        console.log(res.data);
        let post_list = [];
        // res로 받은 데이터 정리
        for (let i = 0; i < res.data.post_list.length; i++) {
          post_list.push({
            post_id: res.data.post_list[i].post_id,
            content: res.data.post_list[i].content,
            image: res.data.post_list[i].image,
            profile_image: res.data.post_list[i].profile_image,
            comments: res.data.post_list[i].comments,
          });
        }
        // redux 업데이트
        dispatch(setPost(post_list));
      })
      .catch((err) => {
        console.log(err);
        if (err.res) {
          window.alert('getAllPost 에러');
        }
      });
  };
};
// const getMyPostAX = (history) => {
//   return function (dispatch, getState) {
//     const res = res.post_list;
//     let post_list = [];
//     for (let i = 0; i < res.length; i++) {
//       post_list.push({
//         image: res[i].file,
//         name: res[i].userName,
//         content: res[i].content
//       });
//     }
//     dispatch(setPost(post_list));
//   };
// };

const deletePostAX = (post_id) => {
  return function (dispatch) {
    const options = {
      url: '/api/post',
      method: 'DELETE',
      data: {
        post_id: post_id,
      },
    };
    axios(options)
      .then((res) => {
        console.log(res);
        // 삭제한 게시글의 post_id를 이용, redux 상태 업데이트
        dispatch(deletePost(post_id));
      })
      .catch((err) => {
        console.log(err);
        if (err.res) {
          window.alert('게시글 삭제 에러');
        }
      });
  };
};

const editPostAX = (content, post_id) => {
  return function (dispatch) {
    const options = {
      url: '/api/post',
      method: 'PUT',
      data: {
        post_id: post_id,
        content: content,
      },
    };
    axios(options)
      .then((res) => {
        let post_list = {
          post_id: post_id,
          content: content,
        };
        dispatch(editPost(post_list));
        // 수정한 게시글의 post_id, content를 묶어서 redux 상태 업데이트
      })
      .catch((err) => {
        if (err.res) {
          window.alert('게시글 수정 에러');
        }
      });
  };
};
// reducer
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
        let new_post_list = draft.list.filter((e) => {
          if (e.post_id !== action.payload.post) {
            return e;
          }
        });
        draft.list = new_post_list;
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        // post_list 게시글 데이터중 방금 수정한 게시글과 post_id를 비교하여
        let idx = draft.list.findIndex(
          (p) => p.post_id === action.payload.post.post_id
        );
        // 그 인덱스의 content를 수정된 content로 바꿔준다.
        draft.list[idx].content = action.payload.post.content;
      }),
    // Post에서도 댓글 게시가 가능해서 넣음
    [NEW_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.post_id === action.payload.commentInfo
        );
        draft.list[idx].comments.push('add');
      }),

    [OLD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.post_id === action.payload.commentInfo
        );
        draft.list[idx].comments.pop();
      }),
  },
  initialState
);
const actionCreators = {
  setPost,
  addPostAX,
  getAllPostAX,
  // getMyPostAX,
  deletePostAX,
  editPostAX,
  newComment,
  oldComment,
};

export { actionCreators };
