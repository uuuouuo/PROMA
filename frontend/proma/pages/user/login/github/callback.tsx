import { useEffect } from 'react';
import { getLogin } from "../../../../store/modules/member";
import { connect } from "react-redux";
import { RootState } from "../../../../store/modules";

const mapStateToProps = (state: RootState) => {
    return {
        userInfo : state.userReducer.userInfo,
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getLogin: () =>
            dispatch(getLogin()),
    };
};

const Callback = ({
    getLogin,
    userInfo,
}: {
    getLogin: any;
    userInfo: any;
}
) => {
    useEffect(() => {
        const code = window.location.search.replace("?code=", "");
        localStorage.setItem("code", code);
        getLogin();
    }, []);

    return (
        <></>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Callback);