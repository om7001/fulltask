import { Routes, Route, useNavigate } from 'react-router-dom';
import Authentication from "./Authentication";
import AdminDashBoard from '../Admin/AdminDashBoard';
import UpdateUserByAdmin from '../Admin/UpdateUserByAdmin';
import ViewPostByAdmin from '../Admin/ViewPostByAdmin';
import Error404 from '../Error404';
// import { useEffect, useState } from 'react';
import Navbar from '../Navbar';

// import UserDashboard from './User/UserDashBoard';

function AdminRoutes() {
    const navigate = useNavigate();
    const roll = localStorage.getItem("roll");
    // const [loading, setLoading] = useState(true)
    // const [authToken, setAuthToken] = useState('')
    const token = Authentication()
    if (!token || roll !== "admin") {
        navigate("/userdashboard")
        return null
    }
    return (
        token && roll === "admin" && 
        <>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<AdminDashBoard />} />
            <Route exact path="updateuserbyadmin/:id" element={<UpdateUserByAdmin />} />
            <Route exact path="viewpostbyadmin/:id" element={<ViewPostByAdmin />} />
            <Route path='*' element={<Error404 />} />
        </Routes>
        </>
    )
}

export default AdminRoutes