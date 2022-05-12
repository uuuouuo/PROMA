/* eslint-disable */
import styled, { keyframes } from "styled-components";
import { ThemeType } from "../interfaces/style";
import { FaHandPointLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { RootState } from "../store/modules";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { BACKEND_URL } from "../config";
let sock = new SockJS(`${BACKEND_URL}/ws-stomp`);
let client = Stomp.over(sock);

const animation = keyframes`
    0% {
        transform: translateX(0);
    }
    50% {
        transform:translateX(10px);
    }
    100% {
        transform:translateX(0);
    }
`;

const MainContainer = styled.div`
  width: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  font-size: 20px;
  strong {
    font-size: 150px;
  }
  div {
    margin-top: 100px;
    display: flex;
    align-items: center;
    span {
      font-size: 25px;
      margin-top: 5px;
      margin-right: 20px;
      animation: ${animation} 2s linear infinite;
    }
  }
`;

const StyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    * {
      margin: 0;
      color: ${(props: ThemeType) => props.theme.elementTextColor};
    }
  }
  .Toastify__toast {
    border: 0.5px solid ${(props: ThemeType) => props.theme.elementTextColor};
    min-width: 300px;
    background-color: ${(props: ThemeType) => props.theme.bgColor};
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
    background-color: black;
  }
`;

const mapStateToProps = (state: RootState) => {
  return {
    isLogin: state.userReducer.isLogin,
    userInfo: state.userReducer.userInfo,
  };
};

const Home = ({ isLogin, userInfo }: { isLogin: boolean; userInfo: any }) => {
  const router = useRouter();

  const notify = () => {
    toast("PROMA", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (!userInfo) return;

    if (isLogin) {
      const Authorization = localStorage
        .getItem("Authorization")
        ?.split(" ")[1]
        .toString();

      const NOTI_SUBSCRIBE_URL = `/queue/notification/${userInfo.no}`;
      client.connect({ Authorization }, () => {
        client.subscribe(NOTI_SUBSCRIBE_URL, (res: any) => {
          const messagedto = JSON.parse(res.body);
          console.log(messagedto);
          alert(messagedto.message);
        });
      });
    }
  }, [userInfo]);

  return (
    <MainContainer>
      <StyledContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <strong>PROMA</strong>
      <span>for work management</span>
      <div>
        <span>
          <FaHandPointLeft />
        </span>
        <p>Please go to the project space.</p>
      </div>
      <div>
        <button onClick={notify}>Sample Notify</button>
      </div>
    </MainContainer>
  );
};

export default connect(mapStateToProps, null)(Home);
