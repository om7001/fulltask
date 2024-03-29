import { useForm } from "react-hook-form"
import { useMutation } from '@apollo/client';
import { LOGIN_USER, RESENT_VERIFICATION_MAIL } from '../GraphQL/mutation';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Input from './useForm/Input'
import Button from './useForm/Button'
import { toast } from "react-toastify";
import { useState } from "react";

function Login() {

    const navigate = useNavigate();
    const [verifyDialog, setVerifyDialog] = useState(false)
    const [email, setEmail] = useState()

    const [LoginUser] = useMutation(LOGIN_USER);
    const [ResentVerificationMail, { loading }] = useMutation(RESENT_VERIFICATION_MAIL);

    const handleClick = (e) => {
        navigate(`/${e.target.name}`);
    }

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
        defaultValues: { email: "", password: "" }
    })

    const onSubmit = (data) => {
        // console.log(data);
        LoginUser({
            variables: {
                input: {
                    ...data
                },
            }
        })
            .then((result) => {
                console.log(result.data);
                localStorage.setItem('token', result.data.loginUser.accessToken)
                localStorage.setItem('roll', result.data.loginUser.roll)
                // console.log(data);
                if (result.data.loginUser.active && result.data.loginUser.isVerified) {
                    if (result.data.loginUser.roll === "user") {
                        toast.success("Login Successfully");
                        navigate('/userdashboard')

                    } else if (result.data.loginUser.roll === "admin") {
                        toast.success("Admin Login Successfully");
                        navigate('/admindashboard')
                    }
                } else {
                    // alert("please be verified!");
                }
            })
            .catch((err) => {
                console.error(err.message);
                // toast.error("Email ID And Password Not Match");
                toast.error(err.message);
                if (err.message === "NOT_VERIFIED") {
                    setEmail(data.email)
                    setVerifyDialog(true)
                }
            })
    }

    const handleResent = () => {
        ResentVerificationMail({
            variables: {
                email
            }
        })
            .then((result) => {
                console.log(result);
                toast.success("Mail Sanded Successfully.")
                setVerifyDialog(false)
            })
            .catch((err) => {
                console.error(err.message);
                toast.error(err.message);
            })
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-2">
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
                        </div>

                        <div className="mt-2">
                            <Input
                                label="Password"
                                type="text"
                                name="password"
                                id="password"
                                className=""
                                {...register("password", {
                                    required: true,
                                })}
                                error={errors.password}
                            />
                        </div>

                        <div className="text-sm">
                            <Link to={`/sendforgotpasswordmail`}
                                href="#"
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot password?
                            </Link>
                        </div>


                        <div>
                            <Button
                                label="Sign in"
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            />
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <Link to={`/register`}
                            href="#"
                            name='register'
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            onClick={handleClick}
                        >
                            Registration
                        </Link>
                    </p>
                </div>

            </div>

            {verifyDialog && <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-75">
                <div className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
                    <p className="text-gray-600 mb-1">
                        Please Check Your Mail!
                    </p>
                    <p className="text-gray-600 mb-1">
                        We have sent a verification email to your registered email address.
                    </p>
                    <p className="text-gray-600 mb-6">
                        The email has expired, so You have Click to resent it .
                    </p>

                    <div className="flex items-center"> {/* Container for button and loading spinner */}
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                            onClick={() => setVerifyDialog(false)}
                        >
                            Okay, got it!
                        </button>
                        <button
                            className="bg-blue-500 ml-2 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                            onClick={() => { handleResent() }}
                        >
                            Resend
                        </button>
                        {loading && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" className="ml-2">
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
                </div>
            </div>}
        </>
    )
}

export default Login