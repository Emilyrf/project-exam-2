import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUser } from '../../services/api/api';
import AlertSuccess from '../Alerts/success';
import AlertError from '../Alerts/error';

const LoginForm = () => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /^[\w\.-]+@(stud\.)?noroff\.no$/,
        'Email must be a valid stud.noroff.no or noroff.no email address.',
      ),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters.'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      console.log(response);
      setSuccessMessage('Login successful!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className='card shrink-0 w-full max-w-md shadow-2xl bg-base-100'>
      {successMessage && <AlertSuccess message={successMessage} />}
      {errorMessage && <AlertError errorMessage={errorMessage} />}
      <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-control'>
          <label className='label' htmlFor='email'>
            Email:
          </label>
          <input className='input input-bordered' {...register('email')} type='text' />
          {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
        </div>

        <div className='form-control'>
          <label className='label' htmlFor='password'>
            Password:
          </label>
          <input className='input input-bordered' {...register('password')} type='password' />
          {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
        </div>

        <button className='btn btn-primary mt-8' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;