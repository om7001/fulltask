import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER_BY_ADMIN } from '../../GraphQL/mutation';
import { GET_USER_BY_ADMIN } from '../../GraphQL/query';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../useForm/Input';
import RadioButton from '../useForm/RadioButton';
import Button from '../useForm/Button';
import Select from '../useForm/Select';

const UpdateUserByAdmin = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log(id);
    const [updateUserByAdmin] = useMutation(UPDATE_USER_BY_ADMIN);

    const [userData, setUserData] = useState({});
    // console.log(userData);
    const { loading, error, data } = useQuery(GET_USER_BY_ADMIN, {
        variables: { id }
    });

    useEffect(() => {
        if (data && data.getUserByAdmin) {
            setUserData(data.getUserByAdmin);
        }
    }, [data]);


    const { register, handleSubmit, formState: { errors, dirtyFields }, setValue, getValues } = useForm();


    useEffect(() => {
        if (id && userData) {
            // Set form values once userData is available
            setValue("firstName", userData.firstName || "");
            setValue("lastName", userData.lastName || "");
            setValue("gender", userData.gender || "");
            setValue("age", userData.age || "");
            setValue("dateofbirth", userData.dateofbirth || "");
            setValue("hobbies", userData.hobbies || "");
            setValue("active", userData.active == true ? true : false);
        }
    }, [id, userData, setValue]);

    const selectOption = [
        { label: 'isActive', value: true },
        { label: 'Deactive', value: false },
    ];
    const genderOption = ['male', 'female'];

    const onSubmit = (data) => {
        const keys = Object.keys(dirtyFields);
        const filteredObject = Object.fromEntries(
            Object.entries(data).filter(([key]) => keys.includes(key))
        );
        console.log(filteredObject);
        // const { __typename, age, active, ...rest } = data;
        // console.log( typeof Boolean(active),typeof active );
        console.log(dirtyFields);
        let isActive 
        if (data.active === 'true') {
            isActive = true;
        } else {
            isActive = false;
        }
        // console.log(data);
        updateUserByAdmin({
            variables: {
                input: {
                    ...filteredObject,
                    _id: id,
                    age: Number(data.age),
                    active: isActive
                },
            }
        })
            .then((result) => {
                console.log(result.data);
                navigate("/admindashboard");
            })
            .catch((err) => {
                console.error(err.message);
            });
    }
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-64">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <div className="pb-12">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Update User
                                </h2>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
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
                                    <Select
                                        label="Active"
                                        options={selectOption}
                                        className={""}
                                        id="active"
                                        error={errors.active}
                                        {...register("active", { required: true })}
                                    />
                                </div>

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
                                            {...register("age", { required: true })}
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
                                    label="Update"
                                    type="submit"
                                    className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UpdateUserByAdmin;
