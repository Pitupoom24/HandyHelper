import styles from './Hero_Login_and_Register.module.css';
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

function LoginComp() {
    return (
        <div className={styles.wrapperwrapper}>
        <div className={styles.wrapper}>
            <form action="">
                <h1 style={{ fontWeight: 750, fontFamily: "Fraunces" }}>Login</h1>
                <div className={styles['input-box']}>
                    <input type="text" placeholder="Username" required />
                    <FaUser className={styles.icon} />
                </div>
                <div className={styles['input-box']}>
                    <input type="password" placeholder="Password" required />
                    <FaLock className={styles.icon} />
                </div>

                <div className={styles.forgot}>
                    <a href="">Forgot password</a>
                </div>

                <button type="submit" className = {styles.loginbutton}>Login</button>

                <div className={styles['register-link']}>
                    <p>Don&apos;t have an account? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
        </div>
    );
}

export default LoginComp;