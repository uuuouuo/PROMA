/* eslint-disable */
import { useEffect } from "react";
import {
  getLogin,
  withdrawUser,
  getLogout,
} from "../../../../store/modules/member";
import { connect } from "react-redux";
import { RootState } from "../../../../store/modules";
import { useRouter } from "next/router";

const mapStateToProps = (state: RootState) => {
    return {
        userInfo: state.userReducer.userInfo,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getLogin: () => dispatch(getLogin()),
        getLogout: () => dispatch(getLogout()),
        withdrawUser: (code: string) => dispatch(withdrawUser(code)),
    };
};

const Callback = ({
    getLogin,
    userInfo,
    getLogout,
    withdrawUser,
}: {
    getLogin: any;
    userInfo: any;
    getLogout: any;
    withdrawUser: any;
}) => {
    const router = useRouter();
    useEffect(() => {
        const code = localStorage.getItem("code");
        console.log(code);

        if (code === null) {
        const newCode = window.location.search.replace("?code=", "");
        localStorage.setItem("code", newCode);
        getLogin().then((res: any) => {
            router.push("/")});
        } else {
        withdrawUser(code)
            .then((res: any) => {
            router.push("/");
            getLogout();
            })
            .catch((err: any) => console.log(err));
        }
    }, []);

    return <></>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
