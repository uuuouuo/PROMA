import { useEffect } from 'react';
import { BsChevronCompactLeft } from 'react-icons/bs';
import { getMemberList } from "../../../../store/modules/member";

const Callback = () => {

    useEffect(() => {
        const code = window.location.search.replace("?code=", "");
        localStorage.setItem("code", code);
        console.log(code);
        getMemberList();
    })

    return (
        <></>
    );
};

export default Callback;