import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../Login'
import Register from '../Register';
// import ForgotPassword from '../ForgotPassword';
// import Verify from '../verification';
import SendForgotPsswordMail from '../SendForgotPsswordMail';
import { useEffect, useState } from 'react';
import Error404 from '../Error404';
import PublicAuthentication from './PublicAuthentication';


function PublicRoutes() {
    const navigate = useNavigate();
    const roll = localStorage.getItem("roll");
    const [loading, setLoading] = useState(true)
    const [authToken, setAuthToken] = useState('')
    const token = PublicAuthentication()

    useEffect(() => {
        if (!token) {
            setLoading(false)
        }
        if (token) {
            setAuthToken(token)
        }
    }, [token])

    if (loading) {
        return <p>loading...</p>
    }

    if (!authToken) {
        return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="sendforgotpasswordmail" element={<SendForgotPsswordMail />} />
                <Route path='*' element={<Error404 />} />
            </Routes>
        )
    }
    try {
        navigate(roll === "admin" ? '/admindashboard' : '/userdashboard');
    } catch (error) {
        console.error("Error parsing roll from localStorage:", error);
    }

    return null;
}

export default PublicRoutes
