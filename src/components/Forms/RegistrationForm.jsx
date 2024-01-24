import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const RegistrationForm = () => {
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Name is required')
            .matches(/^[A-Za-z0-9_]+$/, 'Name must not contain punctuation symbols apart from underscore (_).'),
        email: yup
            .string()
            .required('Email is required')
            .matches(
                /^[\w\.-]+@(stud\.)?noroff\.no$/,
                'Email must be a valid stud.noroff.no or noroff.no email address.'
            ),
        password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters.'),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        // Your registration logic here
        console.log(data);
    };

    return (
        <div className='card shrink-0 w-full max-w-md shadow-2xl bg-base-100'>
            <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
                <div className='form-control'>
                    <label className='label' htmlFor="name">Name:</label>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <>
                                <input className='input input-bordered' {...field} type="text" />
                                {errors.name && <div>{errors.name.message}</div>}
                            </>
                        )}
                    />
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="email">Email:</label>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <>
                                <input className='input input-bordered' {...field} type="text" />
                                {errors.email && <div>{errors.email.message}</div>}
                            </>
                        )}
                    />
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="password">Password:</label>
                    <Controller 
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <>
                                <input className='input input-bordered' {...field} type="password"  />
                                {errors.password && <div>{errors.password.message}</div>}
                            </>
                        )}
                    />
                </div>

                <button className='btn btn-primary mt-8' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
