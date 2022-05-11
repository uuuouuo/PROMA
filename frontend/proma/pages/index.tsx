/* eslint-disable */
import styled, { keyframes } from "styled-components";
import { ThemeType } from "../interfaces/style";
import { FaHandPointLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { RootState } from "../store/modules";
import { connect } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

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
  };
};

// let toastId = null;
function notify() {
  toast("PROMA", {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

let sock = new SockJS("https://k6c107.p.ssafy.io/api/ws-stomp");
let client = Stomp.over(sock);

const Home = ({ isLogin }: { isLogin: boolean }) => {
  //   useEffect(() => {
  //     getRefresh();
  //   }, []);

  useEffect(() => {
    //알림 연결 로직
    if (!isLogin) {
      console.log("not yet");
    //   client.disconnect();
      return;
    } else {
      console.log("ready");
    }
    const Authorization = localStorage.getItem("Authorization");
    if (!Authorization) return;
    console.log(Authorization);

    client.connect(
      { Authorization: localStorage.getItem("Authorization")?.toString() },
      () => {
        //   client.send(
        //     "https://j6c103.p.ssafy.io:8081/notification/send?userNo=U001"
        //   );
        // client.send(`/app/chat/${(메세지받을대상)user.id}`,{},JSON.stringify(res.data));
        client.subscribe("/queue/notification/FISZ6HYHc6NwLYF", (res) => {
          const messagedto = JSON.parse(res.body);
          console.log(messagedto);
          alert(messagedto.message);
        });
      }
    );
    // return () => client.disconnect();
  }, [isLogin]);
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
