import React from "react";
import { Cookies } from "react-cookie";
import { useHistory } from "react-router";

const Test = () => {
  const cookies = new Cookies();
  const history = useHistory();
  return (
    <React.Fragment>
      <button
        onClick={() => {
          cookies.remove("token");
          history.push("/login");
        }}
      >
        로그아웃
      </button>
    </React.Fragment>
  );
};

export default Test;
