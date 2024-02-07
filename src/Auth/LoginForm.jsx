import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUser } from '../services/api/api';
import AlertSuccess from '../components/Alerts/success';
import AlertError from '../components/Alerts/error';
import { useUserActions } from '../stores/useUserStore';
import { useNavigate } from 'react-router-dom';

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

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { setUser } = useUserActions();

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(data) {

    try {
      setSuccessMessage('');
      setErrorMessage('');
      setIsLoading(true);

      const response = await loginUser(data);

      if (response.data.stats === 'error') {
        setErrorMessage(response.data.message || 'There was an error');
      } else {
        setSuccessMessage('Login successful!');
        setUser(response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage(error.message || 'There was an error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='card shrink-0 w-full max-w-md shadow-2xl bg-base-100'>
      {successMessage && <AlertSuccess message={successMessage} />}
      {errorMessage && <AlertError errorMessage={errorMessage} />}
      <h1 className='text-3xl font-bold text-secondary m-5 text-center'>Login to your Holidaze account:</h1>
      <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isLoading}>
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
          <div className='form-control'>
            <button className='btn btn-primary mt-8' type='submit'>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginForm;
