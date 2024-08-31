import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { useState } from 'react';
import { IUser } from '../../../Interfaces/UserInterface';
import $api from '../../../api';
import serverAdress from '../../../serverAdress';

function Login() {

    const [userData, setUserData] = useState<IUser>({name: "", email: "", password: ""});
    const navigation = useNavigate();

    const login = async () => {
        if ((userData.email && userData.password) !== "") {
            await $api.post(serverAdress + '/auth/login', {email: userData.email, password: userData.password})
            .then((res) => {
                navigation("/Profile");
                localStorage.setItem("token", res.data.token);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <div className="login">
            <div className="login__header">
                <h3>Вход</h3>
            </div>
            <div className="login__form">
                <input onChange={(e) => setUserData({...userData, email: e.target.value})} placeholder='Ваш логин' type = "text" />
                <input onChange={(e) => setUserData({...userData, password: e.target.value})}placeholder='Ваш пароль' type = "text" />
                <h4 onClick={() => navigation("/Registration")}>Регистрация</h4>
            </div>
            <div className="login__button">
                <button onClick={login}>Войти</button>
            </div>
        </div>
    );
}

export default Login;
