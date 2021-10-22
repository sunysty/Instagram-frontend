import React, { useState } from 'react';
import { Grid, Input, Text } from '../elements/index';
import { actionCreators as postActions } from '../redux/modules/post';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { history } from '../redux/configStore';

const PostWrite = (props) => {
  const dispatch = useDispatch();

  const [preview, setPreview] = useState('http://via.placeholder.com/400x300');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');

  const addPost = () => {
    dispatch(postActions.addPostAX(content, image, history));
  };

  const selectImage = (e) => {
    const image_target = e.target.files[0];
    const imageUrl = URL.createObjectURL(image_target);
    setImage(imageUrl);

    //미리보기
    const reader = new FileReader();
    reader.onload = (image_target) => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(image_target);
  };

  const contentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <React.Fragment>
      <Container>
        <Grid flex_column border padding='' margin=''>
          <ImageContainer>
            <Grid>
              <Text margin='0px' padding='10px' size='32px' bold>
                게시글 작성하기
              </Text>
              <Input type='file' onChange={selectImage} />
            </Grid>
            <Grid padding='3px'>
              <Text margin='0px' size='24px' bold>
                미리보기{' '}
              </Text>
              <img shape='rectangle' src={preview} />
            </Grid>
          </ImageContainer>
          <TextContainer>
            <Grid is_flex>
              <Input
                value={content}
                _onChange={contentChange}
                label='게시글 내용'
                placeholder='게시글 작성'
                multiLine
              />
            </Grid>
            <button text='게시글 작성' _onClick={addPost}>
              업로드
            </button>
          </TextContainer>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.section`
  box-sizing: border-box;
  padding-top: 100px;
  margin: 0 auto;
  max-width: 1000px;
  position: relative;
  width: 100%;
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  padding: 10px 0px;
  background-size: contain;
  width: 100%;
  display: flex;
`;

const TextContainer = styled.div`
  box-sizing: border-box;
  background-size: contain;
  width: 100%;
  display: flex;
`;

export default PostWrite;
