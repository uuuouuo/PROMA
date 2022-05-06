/* eslint-disable */
import { useEffect } from "react";
import { getLogin } from "../../../../store/modules/member";
import { connect } from "react-redux";
import { RootState } from "../../../../store/modules";
import { useRouter } from "next/router";
import { getProjectList } from "../../../../store/modules/project";

const mapStateToProps = (state: RootState) => {
  return {
    userInfo: state.userReducer.userInfo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getLogin: () => dispatch(getLogin()),
  };
};

const Callback = ({ getLogin, userInfo }: { getLogin: any; userInfo: any }) => {
  const router = useRouter();

  useEffect(() => {
    const code = window.location.search.replace("?code=", "");
    localStorage.setItem("code", code);
    getLogin().then((res: any) => {
      router.push("/");
    });
  }, []);

  return <></>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
