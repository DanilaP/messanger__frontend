import { useEffect, useState } from 'react';
import './FriendsModal.scss';
import $api from '../../../../api';
import serverAdress from '../../../../serverAdress';
import { useParams } from 'react-router-dom';


function FriendsModal(props: {friends: any, close: VoidFunction}) {

    const [currentFriends, setCurrentFriends] = useState(props.friends);
    const params = useParams();

    const deleteFriend = async (deletedFriendId: string) => {
        await $api.post(serverAdress + "/users/deleteFriend", {deletedFriendId: deletedFriendId})
        .then((res) => {
            setCurrentFriends(res.data.friends);
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if (params.id === undefined) {
            $api.get(serverAdress + "/users/myFriendsData")
            .then((res) => {
                setCurrentFriends(res.data.friends);
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else {
            $api.post(serverAdress + "/users/guestFriendsData", {friends: props.friends})
            .then((res) => {
                setCurrentFriends(res.data.friends);
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [])

    return (
        <div className="friends__main">
            <div className="friends__main_modal">
                <div onClick={props.close} className="close__button">x</div>
                <div className="friends__list">
                    {
                        currentFriends.map((friend: any, index: number) => {
                            return (
                                <div key={index} className='friends__list_friend'>
                                    <img src={friend.avatar} />
                                    <div className="name">{friend.name}</div>
                                    {
                                        params.id === undefined ? (
                                            <div className="settings">
                                                <button onClick={() => deleteFriend(friend._id)} className='deleteFriend__button'>Удалить друга</button>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default FriendsModal;
