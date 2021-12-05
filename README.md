## Instagram Clone

<br/>

### 📋 프로젝트 내용
---
`소셜미디어 인스타그램을 클론한 사이트 입니다.`

<a href="https://youtu.be/3Ln_p9Wq9Cg">▶️ 영상보러가기<a/>

</br><br/>

### 👨‍🦲 기간 및 팀구성
---
` 2021.10.17 ~ 2021.10.22 (5일) `<br/>
` 13조 (6명) `<br/>
` Front-end | 김갑민, 석지선, 안정우 `<br/>
` Back-end | 심우진, 양희준, 오성현 `

</br><br/>

### 🛠 FE팀 역할분담 
---
` 김갑민 | 로그인 회원가입 `<br/>
` 안정우 | CRUD `<br/>
` 석지선 | 이미지 업로드 `<br/>
` 다같이 | 백앤드와 통신(axios) `

<br/><br/>

### ⚙️사용기술
---
<img src='https://img.shields.io/badge/React-v17.0.2-61DAFB?logo=React'/> <img src='https://img.shields.io/badge/Redux-v7.2.5-764ABC?logo=Redux'/>
<img src='https://img.shields.io/badge/React Router-v5.3.0-CA4245?logo=React Router'/>
<img src='https://img.shields.io/badge/styled components-v5.3.0-DB7093?logo=styled components'/>
<img src='https://img.shields.io/badge/Immer-v5.3.0-00E7C3?logo=Immer'/>

<br/><br/>

### 📅진행사항
---
#### 첫째날
- API설계 및 와이어프레임 작성
- 최소단위 컴포넌트 및 엘리먼트 세팅

##### 와이어프레임
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f9b302ef-f848-4e40-adfa-72a9a3ddfd60/1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211022%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211022T163738Z&X-Amz-Expires=86400&X-Amz-Signature=fece587751a89a70c98e51e5340dcd2d6c56f96f8a06d6c275916c62c5ed0319&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%221.jpg%22" width="50%"/><img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4a66c9da-463a-4322-a68d-97c94e21e365/3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211022%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211022T163831Z&X-Amz-Expires=86400&X-Amz-Signature=685ce7b19ddc20a0a17c41f3d9aed719367f6a05b5a784ebaff312e61a95579e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%223.jpg%22" width="50%"/>

##### API설계

<a href="https://www.notion.so/5281991e362c4e02a6098522d2429340?v=85c07b9086fc41ffac69692c8bafd01b">✨API설계 테이블로 바로가기</a>
![image](https://user-images.githubusercontent.com/67423755/138525829-92acecfc-5c78-4f66-a3de-a8dd03b7c797.png)
![image](https://user-images.githubusercontent.com/67423755/138525882-5358c79d-fd9d-434b-8cc5-1567d20c7f09.png)


#### 둘째날
- 로그인, 회원가입 기능구현(중복확인검사)
- CRUD 기본 프레임 구현

#### 셋째날
- 쿠키설정 및 로그인기능 서버와 연동
- CRUD 리덕스 추가
- 이미지 업로드 추가

#### 넷째날
- 로그인 회원가입 페이지 CSS
- CRUD 기능 수정
- 이미지 업로드 기능 수정

#### 다섯째날
- 서버와의 통신
- CRUD 마무리
- 뷰 CSS 마무리 작업

<br/><br/>

### 🚀 프로젝트를 진행하면서 해결한 문제
---
- formData 사용 : 
이미지파일 업로드 시 파일이 바로 보내지지 않아서 formData를 사용해서 형식에 맞춰 서버로 보냄.

- 반응형 컴포넌트 : 
인스타그램에서 볼 수 있는 깔끔한 헤더를 구현하고 싶었다. 그래서 크기마다 헤더의 배너, 버튼이 잘 보일수 있게끔 Grid를 씌워 flex, justify-content 값을 주면서 반응형으로 만들었다.

- for문 사용 : 
Post를 게시 할 때마다 num값을 줘서 각각 Post마다 고유번호를 하나씩 붙여서 num값으로 게시글을 비교적 쉽게 찾을 수 있게 사용해보았다. 


