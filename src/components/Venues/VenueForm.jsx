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
  price: yup.number().required('Price is required').positive('Price must be a positive number'),
  maxGuests: yup.number().required('Maximum Guests is required').positive('Maximum Guests must be a positive number'),
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

  const [mediaUrls, setMediaUrls] = useState(['']);
  const addMediaUrlInput = () => {
    setMediaUrls([...mediaUrls, '']);
  };

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
          <label className='label font-bold text-xl' htmlFor='name'>
            Name:
          </label>
          <input className='input input-bordered' {...register('name')} type='text' />
          {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
        </div>

        <div className='form-control'>
          <label className='label font-bold text-xl' htmlFor='description'>
            Description:
          </label>
          <textarea className='input input-bordered' {...register('description')} />
          {errors.description && <span className='text-red-600'>{errors.description.message}</span>}
        </div>
        <div className='form-control'>
          <span className='text-left font-bold text-xl mt-4'> Media:</span>
          {fields.map((media, index) => (
            <div key={media.id} className="flex items-center mb-4">
              <label className='label' htmlFor={`media-${index}`}>
                Media URL {index + 1}:
              </label>
              <input
                id={`media-${index}`}
                className='input input-bordered ml-2'
                {...register(`media[${index}]`)}
                type='text'
              />
              {index > 0 && (
                <button type='button' className="btn ml-2" onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <div className="flex justify-center">
            {errors.media && <span className='text-red-600'>{errors.media.message}</span>}
            <button type='button' className="btn btn-secondary text-lg w-32" onClick={() => append('')}>
              Add Media
            </button>
          </div>
        </div>


        <div className='form-control'>
          <label className='label font-bold text-xl' htmlFor='price'>
            Price:
          </label>
          <input className='input input-bordered' {...register('price')} type='number' min="0" />
          {errors.price && <span className='text-red-600'>{errors.price.message}</span>}
        </div>
        <div className='form-control'>
          <label className='label font-bold text-xl' htmlFor='maxGuests'>
            Maximum Guests:
          </label>
          <input className='input input-bordered' {...register('maxGuests')} type='number' min="0" />
          {errors.maxGuests && <span className='text-red-600'>{errors.maxGuests.message}</span>}
        </div>

        <div className='form-control'>
          <label className='label font-bold text-xl'>Facilities:</label>
          <div className="mt-2">
            <div className="flex items-start">
              <div className="mr-4">
                <label htmlFor='wifi'>Wifi:</label>
              </div>
              <div className="mt-1">
                <input type='checkbox' {...register('meta.wifi')} />
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4">
                <label htmlFor='parking'>Parking:</label>
              </div>
              <div className="mt-1">
                <input type='checkbox' {...register('meta.parking')} />
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4">
                <label htmlFor='breakfast'>Breakfast:</label>
              </div>
              <div className="mt-1">
                <input type='checkbox' {...register('meta.breakfast')} />
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4">
                <label htmlFor='pets'>Pets:</label>
              </div>
              <div className="mt-1">
                <input type='checkbox' {...register('meta.pets')} />
              </div>
            </div>
          </div>
        </div>

        <div className='form-control text-left'>
          <label className='label font-bold text-xl'>Location:</label>
         
            <label htmlFor='address'>Address:</label>
            <input className='input input-bordered mb-2' {...register('location.address')} type='text' />
            {errors.location && errors.location.address && (
              <span className='text-red-600'>{errors.location.address.message}</span>
            )}
     
      
            <label htmlFor='city'>City:</label>
            <input className='input input-bordered' {...register('location.city')} type='text' />
            {errors.location && errors.location.city && (
              <span className='text-red-600'>{errors.location.city.message}</span>
            )}
    
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
        <button className='btn btn-primary mt-8 text-lg' type='submit'>
          {venueId ? 'Update Venue' : 'Create Venue'}
        </button>
      </form>
    </div>
  );
}
