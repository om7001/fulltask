import { Routes, Route, useNavigate } from 'react-router-dom';
import Authentication from "./Authentication";
import UserDashboard from '../User/UserDashBoard';
import CreatePost from '../User/CreatePost';
import Profile from '../User/Profile';
import UpdatePost from '../User/UpdatePost';
import Error404 from '../Error404';
import Navbar from '../Navbar';
import FolloweUser from '../User/FolloweUser';


function UserRoutes() {
    const navigate = useNavigate();
    const roll = localStorage.getItem("roll");
    // const [loading, setLoading] = useState(true)
    // const [authToken, setAuthToken] = useState('')
    const token = Authentication()
    // console.log(token);

    // useEffect(() => {
    //     if (token) {
    //         setAuthToken(token)
    //         setLoading(false)
    //     }
    // }, [token])

    // if (loading) {
    //     return <p>loading...</p>
    // }

    // if (authToken && roll === "user") {

    if (!token || roll !== "user") {
        navigate("/admindashboard")
        return null
    }
    return (
        token && roll === "user" &&
        <>
            <Navbar />
            <Routes>
                <Route path='/'>
                    <Route index element={<UserDashboard />} />
                    <Route exact path="createpost" element={<CreatePost />} />
                    <Route exact path="Profile">
                        <Route index element={<Profile />} />
                        <Route exact path="followeuser" element={<FolloweUser />} />
                    </Route>
                    <Route exact path="updatepost/:id" element={<UpdatePost />} />
                    <Route path='*' element={<Error404 />} />
                </Route>
            </Routes>
        </>
    )
    // }
}

export default UserRoutes