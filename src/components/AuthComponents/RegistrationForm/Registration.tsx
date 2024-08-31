import { useNavigate } from 'react-router-dom';
import './Registration.scss';
import { useState } from 'react';
import { IUser } from '../../../Interfaces/UserInterface';
import $api from '../../../api.js';
import serverAdress from '../../../serverAdress.js';

function Registration() {

    const [userData, setUserData] = useState<IUser>({name: "", email: "", password: ""});
    const navigation = useNavigate();

    const registration = async () => {
        if ((userData.name && userData.email && userData.password) !== "") {
            await $api.post(serverAdress + '/auth/registration', {...userData})
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
        <div className="registration">
            <div className="registration__header">
                <h3>Регистрация</h3>
            </div>
            <div className="registration__form">
                <input onChange={(e) => setUserData({...userData, name: e.target.value})} 
                       placeholder='Ваше имя' 
                       type = "text" />
                <input onChange={(e) => setUserData({...userData, email: e.target.value})} 
                       placeholder='Ваш логин' 
                       type = "text" />
                <input onChange={(e) => setUserData({...userData, password: e.target.value})} 
                       placeholder='Придумайте пароль' 
                       type = "text" />
                <h4 onClick={() => navigation("/Login")}>Войти</h4>
            </div>
            <div className="registration__button">
                <button onClick={registration}>Зарегестрироваться</button>
            </div>
        </div>
    );
}

export default Registration;
