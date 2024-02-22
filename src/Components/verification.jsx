import { useMutation } from '@apollo/client';
import { VERIFY_USER, RESENT_VERIFICATION_MAIL } from '../GraphQL/mutation';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from './useForm/Input';
import { useForm } from 'react-hook-form';
import Button from './useForm/Button';
import { toast } from 'react-toastify';

const Verification = () => {

    const navigate = useNavigate();
    const [verifyDialog, setVerifyDialog] = useState(false)
    const [data, setData] = useState(false)
    const [userVerify] = useMutation(VERIFY_USER);
    const [ResentVerificationMail, { loading }] = useMutation(RESENT_VERIFICATION_MAIL);
    const { token } = useParams();

    const {
        register,
        // watch,
        // setValue,
        // reset,
        // setFocus,
        // clearErrors,
        // getValues,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { email: "" }
    })

    const onSubmit = (data) => {
        // console.log(data);
        ResentVerificationMail({
            variables: {
                email: data.email
            }
        })
            .then((result) => {
                console.log(result.data);
                if (result.data.resentVerificationMail) toast.success("Mail Sanded Successfully.")
                setVerifyDialog(false)
            })
            .catch((err) => {
                console.error(err.message);
                toast.error(err.message);
            })
    }

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
                setData(true)
                // if (result.data.userVerify.isVerified) navigate("/")
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === "ISVERIFIED") {
                    navigate('/')
                }
                if (error.message === "jwt expired") {
                    setVerifyDialog(true)
                }

            })
            
    }, [])



    return (
        <>
            {data &&  (
                <div className="bg-gray-100 h-screen flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" className="w-16 h-16 mx-auto text-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <h2 className="text-2xl font-bold text-green-500 mt-4">Verification Successful!</h2>
                        <p className="text-gray-600 mt-2">Thank you for verifying your account.</p>
                        <Link to='/' className="text-blue-500 mt-4 block underline">Continue to Login Page</Link>
                    </div>
                </div>
            )}

            {verifyDialog && <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-75">
                <div className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Your Token Is Expired!</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label="Email"
                            type="text"
                            name="email"
                            id="email"
                            className=""
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                            error={errors.email}
                        />
                        <div className="flex items-center">
                            <Button
                                label={"Send"}
                                className="bg-blue-500 mt-5 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                            // onClick={() => { handleResent() }}
                            />
                            {loading && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" className="ml-2 mt-5">
                                    <g stroke="#808080">
                                        <circle cx={12} cy={12} r={9.5} fill="none" strokeLinecap="round" strokeWidth={3}>
                                            <animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"></animate>
                                            <animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"></animate>
                                        </circle>
                                        <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
                                    </g>
                                </svg>
                            )}
                        </div>

                    </form>
                </div >
            </div >}
        </>

    );
};

export default Verification;
