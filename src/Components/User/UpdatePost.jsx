import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_POST } from '../../GraphQL/mutation';
import { GET_POST } from '../../GraphQL/query';
import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Input from '../useForm/Input'
import Button from '../useForm/Button'

function UpdatePost() {

    const navigate = useNavigate();

    const { id } = useParams()
    // console.log(id);

    const [UpdatePost] = useMutation(UPDATE_POST);

    const { loading, error, data } = useQuery(GET_POST, {
        variables: {
            id: id
        }
    })

    const {
        register,
        // watch,
        // reset,
        // setFocus,
        // clearErrors,
        // getValues,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (data) {
            setValue('title', data.getPost.title);
            setValue('description', data.getPost.description);
        }
    }, [data, setValue]);

    // console.log(data);

    const onSubmit = (data) => {
        data._id = id
        // console.log(data);
        UpdatePost({
            variables: {
                input: {
                    ...data
                },
            }
        })
            .then((result) => {
                console.log(result.data);
                navigate("/userdashboard")
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
                        Update Post
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

                        <div>
                            <Button
                                label="Upadate"
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            />
                        </div>
                    </form>

                </div>

            </div>
        </>
    )
}

export default UpdatePost