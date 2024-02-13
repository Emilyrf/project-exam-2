import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../../stores/useStore';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createVenue } from '../../services/api/http';
import CountrySelect from '../LocationSelect/CountrySelect';
import ContinentSelect from '../LocationSelect/ContinentSelect';
import AlertSuccess from '../Alerts/success';
import AlertError from '../Alerts/error';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  media: yup
    .mixed()
    .test('media-format', 'Invalid media format', value => {
      if (value) {
        if (Array.isArray(value)) {
          return value.every(item => typeof item === 'string');
        } else if (typeof value === 'string') {
          const urls = value.split(',');
          return urls.every(url => url.trim().match(/^(https?:\/\/)?[\w\d.-]+\.[\w\d.-]+(\/[\w\d.-]+)*\/?(\?[^\s]*)?(#\S*)?$/));
        }
        return false;
      }
      return true;
    }),
  price: yup.number().required('Price is required'),
  maxGuests: yup.number().required('Maximum Guests is required'),
  meta: yup.object().shape({
    wifi: yup.boolean().default(false),
    parking: yup.boolean().default(false),
    breakfast: yup.boolean().default(false),
    pets: yup.boolean().default(false),
  }),
  location: yup.object().shape({
    address: yup.string().default('Unknown'),
    city: yup.string().default('Unknown'),
    zip: yup.string().default('Unknown'),
    country: yup.string().default('Unknown'),
    continent: yup.string().default('Unknown'),
  }),
});


const CreateVenueForm = () => {
  const token = useStore((state) => state.token);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        media: Array.isArray(data.media) ? data.media : [data.media]
      };

      const response = await createVenue(token, formData);
      if (response && response.data) {
        console.log('Venue creation successful:', response.data);
        setSuccessMessage('Venue created successfully!');
        setErrorMessage('');
      } else {
        throw new Error('Failed to create venue');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className='card  shadow-2xl bg-base-100'>
      {successMessage && <AlertSuccess message={successMessage} />}
      {errorMessage && <AlertError errorMessage={errorMessage} />}
      <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-control'>
          <label className='label' htmlFor='name'>
            Name:
          </label>
          <input className='input input-bordered' {...register('name')} type='text' />
          {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
        </div>

        <div className='form-control'>
          <label className='label' htmlFor='description'>
            Description:
          </label>
          <textarea className='input input-bordered' {...register('description')} />
          {errors.description && <span className='text-red-600'>{errors.description.message}</span>}
        </div>

        <div className='form-control'>
          <label className='label' htmlFor='media'>
            Media (comma-separated URLs):
          </label>
          <input className='input input-bordered' {...register('media')} type='text' />
          {errors.media && <span className='text-red-600'>{errors.media.message}</span>}
        </div>

        <div className='form-control'>
          <label className='label' htmlFor='price'>
            Price:
          </label>
          <input className='input input-bordered' {...register('price')} type='number' />
          {errors.price && <span className='text-red-600'>{errors.price.message}</span>}
        </div>

        <div className='form-control'>
          <label className='label' htmlFor='maxGuests'>
            Maximum Guests:
          </label>
          <input className='input input-bordered' {...register('maxGuests')} type='number' />
          {errors.maxGuests && <span className='text-red-600'>{errors.maxGuests.message}</span>}
        </div>

        <div className='form-control'>
          <label className='label'>Facilities:</label>
          <div>
            <label htmlFor='wifi'>Wifi:</label>
            <input type='checkbox' {...register('meta.wifi')} />
          </div>
          <div>
            <label htmlFor='parking'>Parking:</label>
            <input type='checkbox' {...register('meta.parking')} />
          </div>
          <div>
            <label htmlFor='breakfast'>Breakfast:</label>
            <input type='checkbox' {...register('meta.breakfast')} />
          </div>
          <div>
            <label htmlFor='pets'>Pets:</label>
            <input type='checkbox' {...register('meta.pets')} />
          </div>
        </div>
        <div className='form-control'>
          <label className='label'>Location:</label>
          <div>
            <label htmlFor='address'>Address:</label>
            <input className='input input-bordered' {...register('location.address')} type='text' />
            {errors.location && errors.location.address && (
              <span className='text-red-600'>{errors.location.address.message}</span>
            )}
          </div>
          <div>
            <label htmlFor='city'>City:</label>
            <input className='input input-bordered' {...register('location.city')} type='text' />
            {errors.location && errors.location.city && (
              <span className='text-red-600'>{errors.location.city.message}</span>
            )}
          </div>
          <div className='form-control'>
            <CountrySelect label='Country' name='location.country' register={register} />
            <ContinentSelect label='Continent' name='location.continent' register={register} />
          </div>
        </div>

        <button className='btn btn-primary mt-8' type='submit'>
          Create Venue
        </button>
      </form>
    </div>
  );
};

export default CreateVenueForm;
