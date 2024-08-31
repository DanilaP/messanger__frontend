import { useEffect, useRef, useState } from 'react';
import './Chat.scss';
import Menu from '../MenuComponent/Menu';
import { useParams } from 'react-router-dom';
import serverAdress from '../../serverAdress';
import $api from '../../api';

function Chat() {

    const params = useParams();
    const [socketState, setSocketState] = useState<WebSocket>();
    const [currentMessages, setCurrentMessages] = useState<{senderId: string, recipientId: string, message: string}[]>();
    const [companionData, setCompanionData] = useState<{avatar: string, id: string, name: string}>();
    const [newMessage, setNewMessage] = useState<string>("");

    const sendMessage = async () => {
        if (newMessage !== "") {
            const messageData = {
                senderToken: localStorage.getItem("token"),
                recipientId: params.id,
                message: newMessage,
            }
            socketState?.send(JSON.stringify(messageData));
        }
    }

    useEffect(() => {
        $api.post(serverAdress + "/messages/getMyMessages", {opponentId: params.id})
        .then((res) => {
            setCurrentMessages(res.data.messages);
        })
        .catch((error) => {
            console.log(error);
        })

        $api.post(serverAdress + "/users/getDataById", {userId: params.id})
        .then((res) => {
            setCompanionData(res.data.userInfo);
        })
        .catch((error) => {
            console.log(error);
        })

        let token: any = localStorage.getItem("token");
        const socket = new WebSocket('ws://localhost:5000', token);
        setSocketState(socket);

        socket.onopen = function() {
            console.log('Соединение установлено');
        };

        socket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            console.log(data);
            setCurrentMessages(data);
        };

        socket.onerror = function(error) {
            console.log(`Ошибка: ${error}`);
        };
    }, [])

    useEffect(() => {
        console.log(currentMessages);
    }, [currentMessages])

    return (
        <div className="chat">
            <Menu />
            <div className="chat__main">
                <div className="chat__main_header">
                    <img className="chat__main_header_img" src={companionData?.avatar}></img>
                    <div className="chat__main_header_name">{companionData?.name}</div>
                </div>
                <div className="chat__chat__main_messages">
                    {
                        currentMessages?.map((msg, index) => {
                            if (params.id !== msg.senderId) {
                                return (<div key={index} className='my__message'>
                                    {msg.message}
                                </div>)
                            } else {
                                return (<div key={index} className='friend__message'>
                                    {msg.message}
                                </div>);
                            }
                        })
                    }
                </div>
                <div className="chat__main_settings">
                    <input onChange={(e) => setNewMessage(e.target.value)} type = "text" placeholder='Введите сообщение' />
                    <button onClick={sendMessage}>Отправить сообщение</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
