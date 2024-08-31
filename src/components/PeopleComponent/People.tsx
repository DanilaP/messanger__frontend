import { useEffect, useState } from 'react';
import './People.scss';
import Menu from '../MenuComponent/Menu';
import $api from '../../api';
import serverAdress from '../../serverAdress';
import { IUser } from '../../Interfaces/UserInterface';
import { useNavigate } from 'react-router-dom';
import store from '../../store';

function People() {

    const [users, setUsers] = useState<IUser[]>([]);
    const navigation = useNavigate();
    const [currentState, setCurrentState] = useState<any>(store.getState());
    
    const sendFriendRequest = async (newFriendId: string | undefined) => {
        await $api.post(serverAdress + "/users/sendFriendRequest", {newFriendId: newFriendId})
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    const goToUserProfile = (userId: string | undefined) => {
        navigation("/Profile/" + userId);
    }

    const startChat = (userId: string | undefined) => {
        navigation("/Chat/" + userId);
    }   

    useEffect(() => { 
        $api.get(serverAdress + "/users")
        .then((res) => {
            setUsers(res.data.users);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <div className="people">
            <Menu />
            <div className="people__list">
                {
                    users.map((user) => {
                        if (currentState?.user._id !== user._id) {
                            return (
                                <div key={user._id} className="user">
                                    <img onClick={() => goToUserProfile(user._id)} src = {user.avatar} className="user__avatar"></img>
                                    <div className="user__settings">
                                        <div className="user__settings_name">{user.name}</div>
                                        <button onClick={() => sendFriendRequest(user._id)}>Добавить в друзья</button>
                                        <button onClick={() => startChat(user._id)}>Написать сообщение</button>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    );
}

export default People;
