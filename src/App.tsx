import { useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/Profile");
        }
        else {
            navigate("/Registration");
        }
    })

    return (
        <div className="App">
    
        </div>
    );
}

export default App;
