import { useForm } from "react-hook-form"
import { useMutation } from '@apollo/client';
import { SEND_FORGOT_PASSWORD_MAIL } from '../GraphQL/mutation';
import { useNavigate } from 'react-router-dom';
import Input from './useForm/Input'
import Button from './useForm/Button'
import { toast } from 'react-toastify';
import { useState } from "react";

function SendForgotPsswordMail() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [SendForgotPasswordMail] = useMutation(SEND_FORGOT_PASSWORD_MAIL);

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
        setLoading(true)
        SendForgotPasswordMail({
            variables: {
                email: data.email
            }
        })
            .then((result) => {
                console.log(result.data);
                if (result.data.sendForgotPasswordMail.status === true) {
                    toast.success("Forgot Password Mail Link Sended");
                    setLoading(false)
                    navigate("/")
                } else {
                    toast.error("Email ID is Not Registered")
                }
            })
            .catch((err) => {
                console.error(err.message);
                toast.error(err.message)
            });
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Email
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            label="Email"
                            type="text"
                            name="email"
                            id="email"
                            className=""
                            {...register("email", { required: true })}
                            error={errors.email}
                        />
                    </div>

                    <div className="flex items-center">
                        <Button
                            label="Request Forgot Password Link!"
                            type="submit"
                            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        />
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
                </form>
            </div>
        </div>
    )
}

export default SendForgotPsswordMail