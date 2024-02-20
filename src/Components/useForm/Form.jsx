import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { Outlet, useParams, useNavigate } from "react-router-dom"
import Input from './Input'
import Select from './Select'
import RadioButton from './RadioButton'
import Button from './Button'
import CheckboxButton from './CheckBoxButton'

function Form() {

    const { id } = useParams();
    const navigate = useNavigate();

    const goToPreviousState = () => {
        window.history.back();
    };
    const [] = useState({});

    const {
        register,
        watch,
        setValue,
        reset,
        setFocus,
        clearErrors,
        getValues,
        handleSubmit,
        formState: { isLoading, isValid, isDirty, isSubmitted, isSubmitSuccessful, errors },
    } = useForm({
        defaultValues: id ? async () => {
            return JSON.parse(localStorage.getItem('formData')).filter((ol) => ol.id === id)[0]
        } : { name: "", num: "", select: "", Gender: false, Subject: [false, false], file: null }
    })

    const selectOption = [
        { label: 'select option', value: '' },
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
    ];

    const genderOption = ['MALE', 'FEMALE'];

    const subjectOption = ['English', 'Science'];

    // const watchName = watch("name")
    // const watchMulti = watch(["name","RollNo"])
    const watchAll = watch()

    const getBase64 = (file) => {
        return new Promise((resolve) => {
            let fileInfo;
            let baseURL = "";
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log("Called", reader);
                baseURL = reader.result;
                // console.log(baseURL);
                resolve(baseURL);
            };
            console.log(fileInfo);
        });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            getBase64(file)
                .then((result) => {
                    setValue("file", {
                        base64URL: result,
                        file,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const generateRandomString = () => {
        return [...Array(10)].map(() => Math.random().toString(36)[2]).join('');
    };
    const randomString = generateRandomString();

    const onSubmit = (data) => {
        console.log(data)
        const oldData = JSON.parse(localStorage.getItem("formData"));
        if (id) {
            const extraData = oldData.filter((ed) => ed.id !== id);
            localStorage.setItem("formData", JSON.stringify([...extraData, data]));
        } else {
            data.id = randomString;
            if (oldData) {
                localStorage.setItem("formData", JSON.stringify([...oldData, data]));
            } else {
                localStorage.setItem("formData", JSON.stringify([data]));
            }
        }
        navigate('/form');
    }

    useEffect(() => {
        if (id) {
            const oldData = JSON.parse(localStorage.getItem("formData"));
            const editableData = oldData.filter((ed) => ed.id === id)
            console.log(editableData[0]);
            // Object.entries(editableData[0]).forEach(([key, value]) => {
            //     setValue(key, value);
            // });
        }

        // !getValues('file') && setError('file',{ type: 'custom', message: 'File is required' })

        // console.log(watchName);
        // console.log(watchMulti);
        // setFocus("name");
        // console.log(watchAll);
    }, [])

    return (
        <div className='container mt-5'>
            <Outlet />

            <Button
                type="button"
                className="btn btn-primary mb-3"
                label="< goBack"
                onClick={goToPreviousState}
            />

            <h2>useForm</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <input defaultValue="test" {...register("example")} />  */}

                <Input
                    label={"Name"}
                    type={"text"}
                    className={""}
                    // id={id}
                    {...register("name", { required: true })}
                    error={errors.name}
                />

                <Input
                    label={"RollNo"}
                    type={"number"}
                    className={""}
                    // id={id}
                    {...register("RollNo", { required: true })}
                    error={errors.RollNo}
                />

                <Select
                    label="Select"
                    options={selectOption}
                    className="custom-select"
                    id="selectField"
                    error={errors.Select}
                    {...register("Select", { required: true })}
                />

                <div className='row mb-3'>
                    <RadioButton
                        label="Gender"
                        className="col-auto"
                        // id="option1"
                        name="gender"
                        option={genderOption}
                        {...register("Gender", { required: true })}
                        error={errors.Gender}
                    />
                </div>

                <CheckboxButton
                    label="Subject"
                    // id="englishCheckbox"
                    option={subjectOption}
                    error={errors.Subject}
                    name="Subject"
                    {...register("Subject", { required: true })}
                />

                {getValues("file") &&
                    <>
                        <div className='row mb-3'>
                            <div className='col-auto mb-3'>
                                <img
                                    src={getValues("file")?.base64URL}
                                    alt="Profile"
                                    style={{ maxWidth: "200px" }}
                                />
                            </div>
                            <div className='col-auto mb-3'>
                                <Button
                                    className="btn btn-primary"
                                    label="X"
                                    onClick={() => {
                                        setValue('file', null)
                                    }} />
                            </div>
                        </div>
                    </>
                }

                {!getValues("file") &&
                    <Input
                        label={"File"}
                        type={"file"}
                        className={""}
                        accept="/"
                        // id={id}            
                        {...register("file", { onChange: handleFile, required: "file is required" })}
                        error={errors.file}
                    />
                }

                <Button
                    type="submit"
                    className="btn btn-primary"
                    label="Click me"
                />

                {/* setValue */}
                <Button
                    type="button"
                    className="btn btn-primary mx-3"
                    label="SetValue"
                    onClick={() => setValue('name', 'John Doe')}
                />

                {/* reset */}
                <Button
                    type="button"
                    className="btn btn-primary mx-3"
                    label="reset"
                    onClick={() => {
                        reset();
                    }}
                />

                {/* setFocus */}
                <Button
                    type="button"
                    className="btn btn-primary mx-3"
                    label="setFocus"
                    onClick={() => {
                        setFocus("name");
                    }}
                />

                {/* clearErrors */}
                <Button
                    type="button"
                    className="btn btn-primary mx-3"
                    label="clearErrors"
                    onClick={() => {
                        clearErrors()
                        // clearErrors("name");
                        // clearErrors(["name", "RollNo"]);
                    }}
                />

                {/* getFile */}
                {/* <Button
                    type="button"
                    className="btn btn-primary mx-3"
                    label="getFile"
                    onClick={() => {
                        handleRetrieveFile(getValues("file"))
                    }}
                /> */}

            </form>

            {isLoading && <p>Loading.....</p>}
            {isValid && <p>isValid.....</p>}
            {isDirty && <p>isDirty.....</p>}
            {isSubmitted && <p>isSubmitted.....</p>}
            {isSubmitSuccessful && <p>isSubmitSuccessful.....</p>}

        </div>
    )
}

export default Form