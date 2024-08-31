import './Menu.scss';
import { useNavigate } from 'react-router-dom';

function Menu() {
    const navigate = useNavigate();

    return (
        <div className="menu">
            <div onClick={() => navigate("/")} className="item">Мой профиль</div>
            <div onClick={() => navigate("/People")} className="item">Люди</div>
            <div onClick={() => navigate("/Messages")} className="item">Мои сообщения</div>
        </div>
    );
}

export default Menu;
