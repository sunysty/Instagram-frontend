import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import { BsPlusSquareFill } from "react-icons/bs";
import { RiHome2Fill } from "react-icons/ri";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import SendIcon from "@material-ui/icons/Send";
import { PostWrite } from "../pages";
const Header = () => {
  const cookies = new Cookies();
  const history = useHistory();
  return (
    <React.Fragment>
      <Container>
        <HeaderContents>
          <BannerContainer>
            <Banner
              onClick={() => {
                history.push("/");
              }}
            ></Banner>
          </BannerContainer>
          <div>
            <IconContainer is_flex justify="space-between" width="100px">
              <ControlPointIcon
                cursor="pointer"
                width="16px"
                height="16px"
                onClick={() => {
                  history.push("/postwrite");
                }}
              />
              <ExitToAppIcon
                cursor="pointer"
                onClick={() => {
                  cookies.remove("token");
                  cookies.remove("is_login");
                  history.push("/login");
                }}
              />
            </IconContainer>
          </div>
        </HeaderContents>
      </Container>
    </React.Fragment>
  );
};
const Container = styled.div`
  border-bottom: 1px solid #dbdbdb;
  width: 100%;
  height: 54px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const HeaderContents = styled.div`
  max-width: 1000px;
  width: 100%;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex_start;
`;
const Banner = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/dab-react.appspot.com/o/instagram.png?alt=media&token=a53527c4-07df-4c3f-ae18-ca30c3e0aa2b");
  flex: 1 1;
  min-width: 103px;
  min-height: 39px;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;
const IconContainer = styled.div`
  width: 130px;
  margin-right: 10px;
  flex: 1 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export default Header;
