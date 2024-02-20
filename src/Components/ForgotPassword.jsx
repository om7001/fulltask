import { useForm } from "react-hook-form"
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD, VERIFY_TOKEN } from '../GraphQL/mutation';
import { useParams, useNavigate } from 'react-router-dom';
import Input from './useForm/Input'
import Button from './useForm/Button'
import { toast } from "react-toastify";
import { useEffect } from "react";

function ForgotPassword() {

    const navigate = useNavigate();
    const { token } = useParams();
    const [ForgotPassword] = useMutation(FORGOT_PASSWORD);
    const [TokenVerification] = useMutation(VERIFY_TOKEN);

    useEffect(() => {
        TokenVerification({
            variables: {
                token
            }
        })
            .then((result) => {
                console.log(result.data.tokenVerification)
                if (!result.data.tokenVerification) navigate('/error')
            })
            .catch((error) => {
                console.log(error.message);
                toast.error(error.message)
            });
    }, [])

    
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
        defaultValues: { password: "", cpassword:"" }
    })

    const onSubmit = (data) => {
        console.log(data);
        if (data.password !== data.cpassword){
            console.error("Passwords do not match");
            return;
        }else{
            delete data.cpassword;
        }
        ForgotPassword({
            variables: {
                input: {
                    token: token,
                    password: data.password
                },
            }
        })
            .then((result) => {
                console.log(result.data);
                toast.success("Password successfully Updated")
                navigate("/")
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
                    Forgot Password
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            label="Password"
                            type="text"
                            name="password"
                            id="password"
                            className=""
                            {...register("password", { required: true })}
                            error={errors.password}
                        />
                    </div>
                    <div>
                        <Input
                            label="Conform Password"
                            type="password"
                            name="cpassword"
                            id="cpassword"
                            className=""
                            {...register("cpassword", { required: true })}
                            error={errors.cpassword}

                        />
                    </div>

                    <div>
                        <Button
                            label="Register"
                            type="submit"
                            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword