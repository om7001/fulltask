import { useForm } from "react-hook-form"
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../GraphQL/mutation';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Input from '../useForm/Input'
import Button from '../useForm/Button'
function CreatePost() {
    // const{refech}=useForm()

    const navigate = useNavigate();

    const [CreatePost] = useMutation(CREATE_POST);

    const {
        register,
        // watch,
        // setValue,
        reset,
        // setFocus,
        // clearErrors,
        // getValues,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { title: "", description: "" }
    })

    const onSubmit = (data) => {
        console.log(data);
        CreatePost({
            variables: {
                input: {
                    ...data
                },
            }
        })
            .then((result) => {
                console.log(result.data);
                // refech()
                reset()
                navigate("/userdashboard")
                // localStorage.setItem('token', JSON.stringify(result.data.loginUser.accessToken))
                // toast.success("Successfully Login.", {
                //     position: toast.POSITION.TOP_CENTER
                // })
            })
            .catch((err) => {
                console.error(err.message);
            });

    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create Post
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-2">
                            <Input
                                label="Title"
                                type="text"
                                name="title"
                                id="title"
                                className=""
                                {...register("title", { required: true })}
                                error={errors.title}
                            />
                        </div>

                        <div className="mt-2">
                            <Input
                                label="Description"
                                type="text"
                                name="description"
                                id="description"
                                className=""
                                {...register("description", { required: true })}
                                error={errors.description}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button
                                label="Create"
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            />
                            <Button
                                label="Cancel"
                                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={navigate("/")}
                            />
                        </div>

                    </form>

                </div>

            </div>
        </>
    )
}

export default CreatePost