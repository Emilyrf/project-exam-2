import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { useStore } from '../../stores/useStore';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createVenue, fetchSingleVenue, updateVenue } from '../../services/api/api';
import CountrySelect from '../LocationSelect/CountrySelect';
import ContinentSelect from '../LocationSelect/ContinentSelect';
import AlertSuccess from '../Alerts/success';
import AlertError from '../Alerts/error';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  media: yup.array().of(yup.string()),
  price: yup.number().required('Price is required'),
  maxGuests: yup.number().required('Maximum Guests is required'),
  rating: yup.number().default(0),
  meta: yup.object().shape({
    wifi: yup.boolean().default(false),
    parking: yup.boolean().default(false),
    breakfast: yup.boolean().default(false),
    pets: yup.boolean().default(false),
  }),
  location: yup.object().shape({
    address: yup.string().nullable(),
    city: yup.string().nullable(),
    zip: yup.string().nullable(),
    country: yup.string().nullable(),
    continent: yup.string().nullable(),
    lat: yup.number().default(0),
    lng: yup.number().default(0),
  }),
});

export default function VenueForm({ venueId }) {
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'media',
  });

  useEffect(() => {
    if (venueId) {
      async function fetchVenue() {
        try {
          const venueData = await fetchSingleVenue(venueId);
          reset(venueData);
          if (venueData.owner.name !== user.name) {
            console.log('Redirecting because user is not the owner.');
            navigate('/not-found');
          }
        } catch (error) {
          console.error('Error fetching venue:', error);
        }
      }
      fetchVenue();
    }
  }, [venueId, reset, user.name, navigate]);

  const onSubmit = async (data) => {
    try {
      if (!user.venueManager) {
        navigate('/not-found');
        return;
      }
      if (venueId) {
        const response = await updateVenue(venueId, token, data);
        if (response && response.data) {
          setSuccessMessage('Venue updated successfully!');
          setErrorMessage('');
        } else {
          throw new Error('Failed to update venue');
        }
      } else {
        const response = await createVenue(token, data);
        if (response && response.data) {
          setSuccessMessage('Venue created successfully!');
          setErrorMessage('');
        } else {
          throw new Error('Failed to create venue');
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className='card  shadow-2xl bg-base-100'>
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
          {fields.map((media, index) => (
            <div key={media.id}>
              <input
                className='input input-bordered'
                {...register(`media[${index}]`)}
                type='text'
              />
              {index > 0 && (
                <button type='button' onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type='button' onClick={() => append('')}>
            Add Media
          </button>
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
            <CountrySelect
              label='Country'
              name='location.country'
              register={register}
              setValue={setValue}
              // value={location?.country || ''}
            />

            <ContinentSelect
              label='Continent'
              name='location.continent'
              // value={location.continent}
              register={register}
              setValue={setValue}
            />
          </div>
        </div>
        {successMessage && <AlertSuccess message={successMessage} />}
        {errorMessage && <AlertError errorMessage={errorMessage} />}
        <button className='btn btn-primary mt-8' type='submit'>
          {venueId ? 'Update Venue' : 'Create Venue'}
        </button>
      </form>
    </div>
  );
}
