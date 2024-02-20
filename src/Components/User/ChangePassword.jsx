import { useForm } from "react-hook-form"
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../../GraphQL/mutation';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import Input from '../useForm/Input'
import Button from '../useForm/Button'

function ChangePassword() {

    const navigate = useNavigate();

    const [ChangePassword] = useMutation(CHANGE_PASSWORD);

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
        defaultValues: { opassword: "", npassword: "", cpassword:"" }
    })
    const onSubmit = (data) => {
        console.log(data);

        if (data.npassword !== data.cpassword) {
            console.error("Passwords do not match");
            return;
        } else {
            delete data.cpassword;
        }

        ChangePassword({
            variables: {
                input: {
                    oldPassword:data.opassword,
                    newPassword:data.npassword
                },
            }
        })
            .then((result) => {
                console.log(result.data);
                navigate("/userdashboard")
            })
            .catch((err) => {
                console.error(err.message);
            });

    }
    return (
        <>
            <div className="flex flex-col justify-center px-6 py-12 lg:px-8">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Change Password
                    </h2>
                </div>
                <div className="m-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-2">
                            <Input
                                label="Current Password"
                                type="text"
                                name="text"
                                id="opassword"
                                className=""
                                {...register("opassword", { required: true })}
                                error={errors.opassword}
                            />
                        </div>

                        <div className="mt-2">
                            <Input
                                label="New Password"
                                type="text"
                                name="npassword"
                                id="npassword"
                                className=""
                                {...register("npassword", { required: true })}
                                error={errors.npassword}

                            />
                        </div>

                        <div className="mt-2">
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

                        <Button
                            label="Set Password"
                            type="submit"
                            className="flex justify-center rounded-md bg-indigo-600 m-8 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword