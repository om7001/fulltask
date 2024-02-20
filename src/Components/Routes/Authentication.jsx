import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Authentication() {
    const [authToken, setAuthToken] = useState();
    // console.log("🚀 ~ PrivateRoute ~ authToken:", authToken);
  
    const navigate = useNavigate();

    // const {token} = useParams()
  
    useEffect(() => {
      const token = localStorage.getItem("token");
    //   console.log("🚀 ~ useEffect ~ token:", token);
  
      if (token) {
        // console.log("Token found, setting authToken:", token);
        setAuthToken(token);
      } else {
        navigate(-1);
        // console.log("No token found.");
      }
    }, []);
    return authToken
  }
  
  export default Authentication