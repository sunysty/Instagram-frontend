import { createAction, handleActions } from "redux-actions";
import produce from "immer";
// import { storage } from '../../shared/firebase';

//Action Type
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

//Action Creator
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }) );
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }) );
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }) );

//Initial State
const initialState = {
  image_url: "",
  uploading: false,
  preview: null,
};

//Middleware
const uploadImageFB = (image) => {
  return function (dispatch, getState) {
    dispatch(uploading(true));
    //파일의 참조만듬(image.name에 실제 파일명이 담겨있음)
    // const _upload = storage.ref(`images/${image.name}`).put(image);
    // _upload.then((snapshot) => {
    //   console.log(snapshot);
    //   //올라갔으면 이미지 링크를 받아오면 된다!!!
    //   //url까지 받아오면 uploading = false
    //   dispatch(uploading(false));
    //   snapshot.ref.getDownloadURL().then((url) => {
    //     dispatch(uploadImage(url));
    //   });
    // });
  };
};

//Reducer
export default handleActions(
  {
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImageFB,
  uploadImage,
  setPreview,
};

export { actionCreators };
