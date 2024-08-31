import { useEffect, useState } from 'react';
import Menu from '../../MenuComponent/Menu';
import './MessageList.scss';
import { IDialog } from '../../../Interfaces/UserInterface';
import $api from '../../../api';
import serverAdress from '../../../serverAdress';
import { useNavigate } from 'react-router-dom';

function MessageList() {
    
    const [dialogs, setDialogs] = useState<IDialog[]>();
    const navigation = useNavigate();

    useEffect(() => {
        $api.get(serverAdress + "/messages/getMyDialogs")
        .then((res) => {
            setDialogs(res.data.dialogs);
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <div className="messageList__main">
            <Menu />
            <div className="messageList">
                {
                    dialogs?.map((dialog) => {
                        return (
                            <div onClick={() => navigation("/Chat/" + dialog._id)} className='messageList__dialog' key={dialog._id}>
                                <img src={dialog.avatar}/>
                                <div className="messageList__dialog_name">{dialog.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default MessageList;
