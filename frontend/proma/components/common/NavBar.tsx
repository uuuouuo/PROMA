import * as React from 'react';
import styles from "../common/NavBar.module.scss";

const NavBar = () => {
  return (
    <>
      <div className={styles.nav_bar}>
        <div className={styles.logo}>
          <a>Proma</a>
        </div>
        <div></div>
        <div className={styles.profile}>
          <img className={styles.profileimg} src="/profileimg.png"/>
        </div>
        <div className={styles.memberfunc}>
          <a>로그인 / 회원가입</a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
