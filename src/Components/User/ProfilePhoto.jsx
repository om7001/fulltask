import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../useForm/Button';
import { useMutation, useQuery } from '@apollo/client';
import { UPLOAD_PROFILE } from '../../GraphQL/mutation';
import { GET_PROFILE } from '../../GraphQL/query';


function ProfilePhoto() {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [filePreview, setFilePreview] = useState('');
    // const [tempUrl, setTempUrl] = useState('');

    const getBase64 = (file) => {
        return new Promise((resolve) => {
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log("Called", reader);
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            getBase64(file)
                .then((result) => {
                    setFilePreview(result);
                    setValue("file", result);
                    console.log("base64 : ", result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const [uploadProfilePhoto] = useMutation(UPLOAD_PROFILE);

    const { loading, error, data } = useQuery(GET_PROFILE);

    useEffect(() => {
        if (data?.getProfilePhoto?.url) {
            const tempUrl = "http://localhost:8000/uploads/" + data.getProfilePhoto.url;
            // setTempUrl(tempUrl);
            setFilePreview(tempUrl);
        }
    }, [data]);


    const onSubmit = (data) => {
        const file = data.file
        if (file) {
            uploadProfilePhoto({
                variables: {
                    input: {
                        url: file
                    }
                }
            }).then((response) => {
                console.log(response);
                // navigate("/userdashboard")
            }).catch((err) => {
                console.error(err);
            });
        } else {
            console.error("No file selected");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="max">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        File Upload
                    </h2>
                </div>
                <div className="m-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {!filePreview && (
                            <div className="px-4 py-6 sm:px-0">
                                <div className="flex items-center justify-center">
                                    <label className="flex flex-col items-center px-4 py-6 bg-white text-indigo-500 rounded-lg shadow-lg tracking-wide uppercase border border-indigo-500 cursor-pointer hover:bg-indigo-500 hover:text-white">
                                        <svg
                                            className="w-64 h-8"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 6a1 1 0 0 1 2 0v5.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8 11.586V6zm3-4a3 3 0 0 1 3 3v2h2a1 1 0 1 1 0 2h-2v2a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-2H2a1 1 0 1 1 0-2h2V5a3 3 0 0 1 3-3h6z"
                                            />
                                        </svg>
                                        <span className="mt-2 text-sm leading-normal">Select a file</span>
                                        <input type="file" name="file" className="hidden" {...register('file', { required: 'File is required' })} onChange={handleFile} />
                                    </label>
                                </div>
                            </div>
                        )}

                        {filePreview && (
                            <div className=" justify-center px-4 py-6 sm:px-0" >
                                <div className="flex items-center justify-center">
                                    <img
                                        src={filePreview}
                                        alt="File Preview"
                                        style={{ maxWidth: "200px" }}
                                    />
                                </div>
                                <Button
                                    label="X"
                                    className="flex ml-20 rounded-md bg-indigo-600 mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => {
                                        setValue('file', null);
                                        setFilePreview('');
                                    }}
                                />
                            </div>
                        )}
                        {errors.file && <p className="text-red-500">{errors.file.message}</p>}
                        <Button
                            label="Upload File"
                            type="submit"
                            className="flex ml-12 justify-center rounded-md bg-indigo-600 mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        />
                    </form>
                </div>
            </div>
        </div>

    );
}

export default ProfilePhoto;