import { useEffect } from 'react';
import { BsChevronCompactLeft } from 'react-icons/bs';
import { getMemberList, getMemberInfo } from "../../../../store/modules/member";

const Callback = () => {

    useEffect(() => {
        const code = window.location.search.replace("?code=", "");
        localStorage.setItem("code", code);
        getMemberList().then(() => Log_in());
    }, []);

    const Log_in = () => {
        getMemberInfo();
    }
    return (
        <></>
    );
};

export default Callback;