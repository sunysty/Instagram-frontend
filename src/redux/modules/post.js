import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import 'moment';
import moment from 'moment';
import user from './user';

// 목록 redux
const SET_POST = 'SET_POST';

// 추가
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';
// const LOADING = 'LOADING';

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (userName) => ({ userName }));
// const loading = createAction(LOADING, (post, post_id) => ({ post, post_id }));

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
  return function (dispatch, getState) {
    // formdata에 파일과 게시글 내용을 담아 서버로 전송
    let formData = new FormData();
    formData.append('file', file);
    formData.append('content', contents);

    const options = {
      url: '/api/upload',
      method: 'POST',
      headers: {
        token: token,
      },
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
