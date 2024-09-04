import './Profile.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $api from '../../api';
import serverAdress from '../../serverAdress';
import { IUser } from '../../Interfaces/UserInterface';
import Menu from '../MenuComponent/Menu';
import FriendRequestsModal from './Modals/FriendRequestsModal/FriendRequestsModal';
import { createPortal } from 'react-dom';
import FriendsModal from './Modals/FriendsModal/FriendsModal';
import store from '../../store';
import { userCreator } from '../../ActionCreators/actionCreators';
import CreatePostModal from './Modals/CreatePostModal/createPostModal';
import PostsList from './PostsListComponent/PostsList';

function Profile() {

    const [userData, setUserData] = useState<IUser>();
    const [guestData, setGuestData] = useState<any>(null);
    const [modalShown, setModalShown] = useState<{modalName: string, isShown: boolean}>({modalName: "", isShown: false});
    const params = useParams();
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const changeProfileAvatar = async (file: FileList | null) => {
        let formData = new FormData();
        formData.append('userAvatar', file![0]);
        
        await $api.post(serverAdress + '/users/changeAvatar', formData)
        .then((res) => {
            setUserData({...userData, avatar: res.data.avatar})
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const openFriendRequestsModal = () => {
        if (userData && userData.friendRequests?.length !== 0) {
            openFriendRequestsModalAfterCondition();
        } else if (guestData && guestData.friendRequests?.length !== 0) {
            openFriendRequestsModalAfterCondition();
        }
        
    }

    const openFriendRequestsModalAfterCondition = () => {
        if (modalShown.isShown) {
            setModalShown({modalName: "", isShown: false});
        } else {
            setModalShown({modalName: "FriendRequestsModal", isShown: true});
        } 
    }

    const openFriendsModalAfterCondition = () => {
        if (modalShown.isShown) {
            setModalShown({modalName: "", isShown: false});
        } else {
            setModalShown({modalName: "FriendsModal", isShown: true});
        } 
    }

    const openFriendsModal = () => {
        if (userData && userData.friends?.length !== 0) {
            openFriendsModalAfterCondition();
        } else if (guestData && guestData.friends?.length !== 0) {
            openFriendsModalAfterCondition();
        }
        
    }

    const createPostModalOpen = () => {
        if (modalShown.isShown) {
            setModalShown({modalName: "", isShown: false});
        } else {
            setModalShown({modalName: "CreatePostModal", isShown: true});
        }
    }

    useEffect(() => {
        const body = document.querySelector('body');
        body!.style.overflowY = modalShown.isShown ? 'hidden' : 'auto';

        if (modalShown.isShown === false && params.id === undefined) {
            $api.get(serverAdress + "/users/myData")
            .then((res) => {
                setUserData(res.data.user);
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [modalShown])

    useEffect(() => {
        if (params.id === undefined) {
            $api.get(serverAdress + "/users/myData")
            .then((res) => {
                setUserData(res.data.user);
                store.dispatch(userCreator(res.data.user));
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else {
            $api.post(serverAdress + "/users/getDataById", {userId: params.id})
            .then((res) => {
                setGuestData(res.data.userInfo);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [])

    return (
        <div className="profile">
            <Menu />
            {(modalShown.isShown && modalShown.modalName === "FriendRequestsModal") && 
            createPortal(<FriendRequestsModal close={openFriendRequestsModal} friendRequests={userData?.friendRequests}/>, document.body)}
            {(modalShown.isShown && modalShown.modalName === "FriendsModal") && 
            createPortal(<FriendsModal friends={guestData === null ? userData?.friends : guestData?.friends} close = {openFriendsModal} /> , document.body)}
            {(modalShown.isShown && modalShown.modalName === "CreatePostModal") && 
            createPortal(<CreatePostModal close = {createPostModalOpen} /> , document.body)}
            {
                (guestData === null) ? (
                <div className='user__main'>
                    <div className="user__main__info">
                        <div className="profile__avatar">
                            <img src = {userData?.avatar} />
                        </div>
                        <div className="profile__data">
                            <div className="profile__data_name">{userData?.name}</div>
                            <div onClick={openFriendsModal} className="profile__data_friends">Мои друзья: {userData?.friends?.length}</div>
                            <div onClick={openFriendRequestsModal} className="profile__data_friends">Заявки в друзья: {userData?.friendRequests?.length}</div>
                        </div>
                    </div>
                    <div className="user__main__settings">
                        <div className="profile__settings">
                            <div className="profile__settings_buttons">
                                <label className="input__file">
                                    <input accept="image/*" onChange={(e) => changeProfileAvatar(e.target.files)} type="file" name="file"/>		
                                    <span>Сменить аватар</span>
                                </label>
                                <button onClick={createPostModalOpen}>Написать пост</button>
                                <button onClick={logout}>Выйти из аккаунта</button>
                            </div>
                        </div>
                    </div>
                    <div className="user__main__posts">
                        { (userData && userData.posts) ? <PostsList posts={userData.posts} /> : null}
                    </div>
                </div>
                ) : (
                    <div className="user__main">
                       <div className="user__main__info">
                            <div className="profile__avatar">
                                <img src = {guestData?.avatar} />
                            </div>
                            <div className="profile__data">
                                <div className="profile__data_name">{guestData?.name}</div>
                                <div onClick={openFriendsModal} className="profile__data_friends">Друзья: {guestData?.friends?.length}</div>
                            </div>
                        </div>
                        <div className="user__main__posts">
                            { (guestData && guestData.posts) ? <PostsList posts={guestData.posts} /> : null}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Profile;
