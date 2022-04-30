import { useEffect } from 'react';
import qs from 'qs';
// import Loader from './Loader';

const Callback = () => {
    const authUri = `http://k6c107.p.ssafy.io:3000/user/login/github/callback`;

    useEffect(() => {
        const getToken = async () => {
        const { code } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });

        try {
            const response = await fetch(`${authUri}?code=${code}`);
            const data = await response.json();

            localStorage.setItem('token', data.jwt);
            localStorage.setItem('ProfileURL', data.avatar_url);

            // history.push('/');
        } catch (error) {}
        };

        getToken();
    }, [authUri]);

    // return <Loader />;

    // useEffect(() => {
    //     const url = window.location.href;
    //     console.log(url);
    // })
};

export default Callback;