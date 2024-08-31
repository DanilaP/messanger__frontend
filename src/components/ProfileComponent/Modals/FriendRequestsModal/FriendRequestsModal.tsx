import { useState } from 'react';
import $api from '../../../../api';
import serverAdress from '../../../../serverAdress';
import './FriendRequestsModal.scss';

function FriendRequestsModal(props: {close: VoidFunction, friendRequests: {id: string, name: string, status: string, avatar: string}[] | undefined}) {

    const [currentFriendRequests, setCurrentFriendRequests] = useState(props.friendRequests);

    const acceptFriendRequest = async (newFriendId: string) => {
        $api.post(serverAdress + "/users/acceptFriendRequest", {friendRequestId: newFriendId})
        .then((res) => {
            setCurrentFriendRequests(res.data.friendRequests);
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const declineFriendRequest = async (newFriendId: string) => {
        $api.post(serverAdress + "/users/declineFriendRequest", {friendRequestId: newFriendId})
        .then((res) => {
            setCurrentFriendRequests(res.data.friendRequests);
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="friendRequests__main">
            <div className="friendRequests__main_modal">
                <div onClick={props.close} className="close__button">x</div>
                <div className="friends__list">
                    {
                        currentFriendRequests?.map((friendRequest: {id: string, name: string, status: string, avatar: string}) => {
                            return (    
                                <div key={friendRequest?.id} className='friends__list_request'>
                                    <img width={"100px"} height={"100px"} src={friendRequest?.avatar} />
                                    <div className="name">{friendRequest.name}</div>
                                    <div className="settings">
                                        <button onClick={() => acceptFriendRequest(friendRequest.id)} className='accept__button'>Принять заявку</button>
                                        <button onClick={() => declineFriendRequest(friendRequest.id)} className='decline__button'>Отменить заявку</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default FriendRequestsModal;
