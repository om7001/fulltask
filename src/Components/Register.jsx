import { useForm } from "react-hook-form"
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../GraphQL/mutation';
import { useNavigate } from 'react-router-dom';
import Input from './useForm/Input'
import RadioButton from './useForm/RadioButton'
import Button from './useForm/Button'
import { toast } from "react-toastify";
import { useState } from "react";

const Register = () => {
    const navigate = useNavigate();
    // console.log(id);
    const [CreateUser] = useMutation(CREATE_USER);

    const [verifyDialog, setVerifyDialog] = useState(false)


    const {
        register,
        // watch,
        // setValue,
        reset,
        // setFocus,
        // clearErrors,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm(
        { firstName: "", lastName: "", email: "", password: "", cpassword: "", gender: false, age: null, dateofbirth: null, hobbies: "" }
    )

    const genderOption = ['male', 'female'];

    const onSubmit = (data) => {
        console.log(data);

        if (data.password !== data.cpassword) {
            console.error("Passwords do not match");
            return;
        } else {
            delete data.cpassword;
        }
        CreateUser({
            variables: {
                input: {
                    ...data,
                    age: Number(data.age)
                },
            }
        })
            .then((result) => {
                console.log(result.data);
                toast.success("User Successfully Registered!")
                setVerifyDialog(true)
                reset()
                // navigate("/")
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    const handleClick = () => {
        setVerifyDialog(false)
        navigate("/")
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-64">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <div className="pb-12">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Registration
                                </h2>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    {/* <label className="block text-sm font-medium leading-6 text-gray-900">First name</label> */}
                                    <div className="mt-2">
                                        <Input
                                            label="First Name"
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            className=""
                                            {...register("firstName", { required: true })}
                                            error={errors.firstName}

                                        />
                                        {/* <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> */}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <div className="mt-2">
                                        <Input
                                            label="Last Name"
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            className=""
                                            {...register("lastName", { required: true })}
                                            error={errors.lastName}

                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <div className="mt-2">
                                        <Input
                                            label="Email Address"
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
                                </div>

                                <div className="sm:col-span-4">
                                    <div className="mt-2">
                                        <Input
                                            label="Password"
                                            type="text"
                                            name="password"
                                            id="password"
                                            className=""
                                            {...register("password", {
                                                required: true,
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                                                    ,
                                                    message: "Password must be at least 8 characters long and include at least one letter and one number."
                                                }
                                            })}
                                            error={errors.password}

                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <div className="mt-2">
                                        <Input
                                            label="Conform Password"
                                            type="password"
                                            name="cpassword"
                                            id="cpassword"
                                            className=""
                                            {...register("cpassword", {
                                                required: true,
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                    message: "Password must be at least 8 characters long and include at least one letter and one number."
                                                },
                                                validate: value => value === getValues("password") || "Passwords do not match."
                                            })}
                                            error={errors.cpassword}

                                        />
                                    </div>
                                </div>
                                {/* {!id && getValues('password') !== getValues('cpassword') && (
                                    <p>Confirm Passwords not matched</p>
                                )} */}

                                <div className="sm:col-span-4">
                                    <RadioButton
                                        label="Gender"
                                        className="col-auto"
                                        // id="option1"
                                        name="gender"
                                        option={genderOption}
                                        {...register("gender", { required: true })}
                                        error={errors.gender}
                                    />
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <div className="mt-2">
                                        <Input
                                            label="Age"
                                            type="number"
                                            name="age"
                                            id="age"
                                            className=""
                                            {...register("age", { required: true, min: 18 })}
                                            error={errors.age}

                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <div className="mt-2">
                                        <Input
                                            label="Date Of Birth"
                                            type="date"
                                            name="dob"
                                            id="dob"
                                            className=""
                                            {...register("dateofbirth", { required: true })}
                                            error={errors.dateofbirth}


                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <div className="mt-2">
                                        <Input
                                            label="Hobbies"
                                            type="text"
                                            name="hobbies"
                                            id="hobbies"
                                            className=""
                                            {...register("hobbies", { required: true })}
                                            error={errors.hobbies}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <Button
                                    label="Register"
                                    type="submit"
                                    className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {verifyDialog && <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-75">
                <div className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
                    <p className="text-gray-600 mb-1">
                        We have sent a verification email to your registered email address.
                    </p>
                    <p className="text-gray-600 mb-6">
                        Please verify your email to activate your account.
                    </p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                        onClick={() => { handleClick() }}
                    >
                        Okay, got it!
                    </button>
                </div>
            </div>}
        </>
    )
}
export default Register;