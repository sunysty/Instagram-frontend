import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment";
import { Cookies } from "react-cookie";
import moment from "moment";
import axios from "axios";
import { actionCreators as postActions } from "./post";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const setComment = createAction(SET_COMMENT, (comment_list) => ({
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (comment) => ({ comment }));
const deleteComment = createAction(DELETE_COMMENT, (comment_id) => ({
  comment_id,
}));

const initialState = {
  list: [],
};

const setCommentAX = (post_id) => {
  return function (dispatch) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const options = {
      url: `http://54.180.83.198:8080/api/comment?postId=${post_id}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "X-AUTH-TOKEN": token.token,
      },
    };
    axios(options)
      .then((response) => {
        console.log("서버에서 가져온 코맨트", response.data.data);
        let comment_list = [];
        let docs = response.data.data;
        docs.forEach((doc) => {
          comment_list.push({ ...doc, post_id: doc.postId });
        });
        // for (let i = 0; i < response.data.data.length; i++) {
        //   comment_list.push({
        //     user_name: response.data.data.commentId[i].username,
        //     content: response.data.data.commentId[i].comment,
        //     createAt: response.data.data.commentId[i].date,
        //     comment_id: response.data.data.commentId[i].commentid,
        //     // 추가 ㄱㄴ
        //   });
        // }
        // redux 상태 업데이트
        console.log("코맨트 리스트", comment_list);
        dispatch(setComment(comment_list));
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert("getCommentAX 에러");
        }
      });
  };
};

const addCommentAX = (post_id, comment) => {
  return function (dispatch) {
    console.log(comment, post_id);
    const cookies = new Cookies();
    const token = cookies.get("token");
    const options = {
      url: "http://54.180.83.198:8080/api/comment",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "X-AUTH-TOKEN": token.token,
      },
      data: {
        comment: comment,
        postid: post_id,
        username: token.username,
      },
    };
    axios(options)
      .then((response) => {
        let comment_list = {
          username: response.data.data.username,
          content: response.data.data.comment,
          createAt: response.data.data.data,
          comment_id: response.data.data.postId,
        };
        // 방금 추가한 코멘트 정보를 redux 상태에 업데이트
        console.log("추가한 코맨트", comment_list);
        dispatch(addComment(comment_list));
        // comment의 개수를 셀 때, post_list에 포함된 comments 배열의 길이를 세서 화면에 표현
        dispatch(postActions.newComment(parseInt(post_id)));
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert("addCommentAX 에러");
        }
      });
  };
};

const deleteCommentAX = (post_id, comment_id, token) => {
  return function (dispatch) {
    const options = {
      url: "http://withoh.shop/api/comment",
      method: "DELETE",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json;charset=UTF-8",
        "X-AUTH-TOKEN": token,
      },
      data: {
        post_Id: post_id,
        comment_Id: comment_id,
      },
    };
    axios(options)
      .then((response) => {
        // redux 상태 업데이트
        dispatch(deleteComment(comment_id));
        dispatch(postActions.setComment(parseInt(post_id)));
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert("deleteCommentAX 에러");
        }
      });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.comment);
      }),

    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let new_comment_list = draft.list.filter((v) => {
          if (v.comment_id !== action.payload.comment_id) {
            return v;
          }
        });

        draft.list = new_comment_list;
      }),
  },
  initialState
);

const actionCreators = {
  setCommentAX,
  addCommentAX,
  deleteCommentAX,
};

export { actionCreators };
