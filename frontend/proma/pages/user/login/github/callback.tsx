import { useEffect } from 'react';
import { getLogin, withdrawUser } from "../../../../store/modules/member";
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
        withdrawUser: () => 
                dispatch(withdrawUser())
    };
};

const Callback = ({
    getLogin,
    userInfo,
    withdrawUser
}: {
    getLogin: any;
    userInfo: any;
    withdrawUser: any;
}
) => {
    
    useEffect(() => {
        if (localStorage.getItem("code") == null) {
            const code = window.location.search.replace("?code=", "");
            localStorage.setItem("code", code);
            getLogin()
        }
        else if (localStorage.getItem("code") !== null) {
            withdrawUser()
        }
    }, []);

    return (
        <></>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Callback);