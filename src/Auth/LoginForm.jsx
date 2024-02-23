import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../stores/useStore';
import { login } from '../services/api/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AlertError from '../components/Alerts/error';

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

export default function LoginForm() {
  const setToken = useStore((state) => state.setToken);
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const { email, password } = data;

    login(email, password)
      .then((res) => {
        if (res.data.accessToken) {
          setToken(res.data.accessToken);
          setUser({
            name: res.data.name,
            email: res.data.email,
            avatar: res.data.avatar,
            venueManager: res.data.venueManager,
          });
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setErrorMessage('Invalid email or password.');
      });
  };

  return (
    <div className='card shrink-0 w-full max-w-md shadow-2xl bg-base-100'>
      <h1 className='text-3xl font-bold text-secondary m-5 text-center'>
        Login to your Holidaze account:
      </h1>
      <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
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
          <div className='form-control mt-2'>
            {errorMessage && <AlertError errorMessage={errorMessage} />}
            <button className='btn btn-primary text-xl mt-8' type='submit'>
              Login
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
