import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '../services/api/api';
import { Link } from 'react-router-dom';
import AlertSuccess from '../components/Alerts/success';
import AlertError from '../components/Alerts/error';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(
      /^[A-Za-z0-9_]+$/,
      'Name must not contain punctuation symbols apart from underscore (_).',
    ),
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

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isVenueManager, setIsVenueManager] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      data.isVenueManager = isVenueManager;
      const response = await registerUser({ ...data, venueManager: isVenueManager });
      setSuccessMessage(
        <>
         You are now registered! Proceed to <Link className="link" to="/login">login</Link>.
        </>
      );
      setErrorMessage('');
      reset();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = error.response.data.errors[0].message;
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage(error.message);
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className='card shrink-0 w-full max-w-md shadow-2xl bg-base-100'>
      <h1 className='text-3xl font-bold text-secondary m-5 text-center'>Register to Holidaze</h1>
      <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isLoading}>
          <div className='form-control'>
            <label className='label' htmlFor='name'>
              Name:
            </label>
            <input className='input input-bordered' {...register('name')} type='text' />
            {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
          </div>

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
          <div className='form-control w-52'>
            <label className='cursor-pointer label'>
              <span className='label-text'>Are you a venue manager?</span>
              <input
                type='checkbox'
                className='toggle toggle-accent'
                {...register('isVenueManager')}
                checked={isVenueManager}
                onChange={() => setIsVenueManager(!isVenueManager)}
              />
            </label>
          </div>
          <div className='form-control'>
            {successMessage && <AlertSuccess message={successMessage} />}
            {errorMessage && <AlertError errorMessage={errorMessage} />}
            <button className='btn btn-primary mt-8' type='submit'>
              {isLoading ? 'Registering in...' : 'Register'}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default RegistrationForm;
