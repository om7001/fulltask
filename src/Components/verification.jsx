import { useMutation } from '@apollo/client';
import { VERIFY_USER } from '../GraphQL/mutation';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Verification = () => {

    const navigate = useNavigate();

    const [userVerify, { data, loading, error }] = useMutation(VERIFY_USER);
    const { token } = useParams();

    useEffect(() => {
        userVerify({
            variables: {
                input: {
                    token: token
                },
            }
        })
            .then((result) => {
                console.log(result.data.userVerify.isVerified);
                if (!result.data.userVerify.isVerified) navigate("/error")
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, [])

    return (
        <>
            <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green"
                    className="w-16 h-16 mx-auto text-green-500">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 13l4 4L19 7"></path>
                </svg>
                <h2 className="text-2xl font-bold text-green-500 mt-4">Verification Successful!</h2>
                <p className="text-gray-600 mt-2">Thank you for verifying your account.</p>
                <Link to='/' className="text-blue-500 mt-4 block underline">Continue to Login Page</Link>
            </div>
        </div>
        </>

    );
};

export default Verification;
