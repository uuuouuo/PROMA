import { useEffect } from 'react';
import { BsChevronCompactLeft } from 'react-icons/bs';
import { getMemberList } from "../../../../store/modules/member";

const Callback = () => {

    useEffect(() => {
        const code = window.location.search.replace("?code=", "");
        localStorage.setItem("code", code);
        getMemberList();
        console.log(code);
        
    }, [])

    return (
        <></>
    );
};

export default Callback;