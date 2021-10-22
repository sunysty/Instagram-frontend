import React, { useState } from 'react';
import { Grid, Input, Button, Text } from '../elements/index';
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
    // const imageUrl = URL.createObjectURL(image_target);
    setImage(image_target);
    console.log(image_target);

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
        <Grid flex_column border padding='2%' margin='2% auto'>
          <ImageContainer>
            <Grid>
              <Text margin='0px' padding='10px' size='32px' bold>
                게시글 작성하기
              </Text>
              <Input type='file' _onChange={selectImage} />
            </Grid>
            <Grid padding='3px'>
              <Text margin='0px' size='24px' bold>
                미리보기{' '}
              </Text>
              <Imgpreview
                shape='rectangle'
                src={preview ? preview : 'http://via.placeholder.com/400x300'}
              />
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
              <Button
                text='게시글 작성'
                _onClick={() => {
                  addPost();
                  history.push('/');
                }}
              >
                업로드
              </Button>
            </Grid>
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

const Imgpreview = styled.img`
  width: 400px;
  height: 300px;
  padding: 25px;
`;

export default PostWrite;
