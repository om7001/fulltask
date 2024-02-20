import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import client from './GraphQL/client'
import UserRoutes from './Components/Routes/UserRoutes';
import AdminRoutes from './Components/Routes/AdminRoutes';
import PublicRoutes from './Components/Routes/PublicRoutes';
import Error404 from './Components/Error404';
import ForgotPassword from './Components/ForgotPassword';
import Verify from './Components/verification';

function App() {


  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<PublicRoutes />} />
            <Route path="/userdashboard/*" element={<UserRoutes />} />
            <Route path="/admindashboard/*" element={<AdminRoutes />} />
            <Route path="/forgotpassword/:token" element={<ForgotPassword />} />
            <Route path="/verify/:token" element={<Verify />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ApolloProvider>
    </>
  )
}

export default App
