import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Registration from './components/AuthComponents/RegistrationForm/Registration';
import Login from './components/AuthComponents/LoginForm/Login';
import Profile from './components/ProfileComponent/Profile';
import People from './components/PeopleComponent/People';
import Chat from './components/ChatComponents/Chat';
import MessageList from './components/MessagesComponents/MessagesList/MessageList';
import store from './store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <Provider store = {store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Registration" element={<Registration />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/People" element={<People />} />
                <Route path='/Profile/:id' element = {<Profile /> }></Route>
                <Route path='/Chat/:id' element = {<Chat /> }></Route>
                <Route path='/Messages' element = {<MessageList /> }></Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
