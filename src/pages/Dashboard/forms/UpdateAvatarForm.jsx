import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateProfileMedia } from '../../../services/api/api';
import { useUserActions } from '../../../stores/useUserStore';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AlertError from '../../../components/Alerts/success';
import AlertSuccess from '../../../components/Alerts/success';

const UpdateProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [newAvatarUrl, setNewAvatarUrl] = useState('');

  const validationSchema = yup.object().shape({
    url: yup.string().url('Please enter a valid URL').required('URL is required'),
  });

  

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit = async (data) => {
    try {
      setSuccessMessage('');
      setErrorMessage('');
      setIsLoading(true);
      const response = await updateProfileMedia(data.url);

      if (response) {
        setSuccessMessage('Profile media updated successfully!');
      } else {
        setErrorMessage('Unexpected response format or missing expected properties');
      }
    } catch (error) {
      setErrorMessage(`Error updating profile media`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    const modal = document.getElementById('update_avatar_modal');
    if (modal) {
      modal.close();
    }
  };

  return (
    <dialog id='update_avatar_modal' className='modal'>
      <div className='modal-box'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {successMessage && <AlertSuccess message={successMessage} />}
          {errorMessage && <AlertError errorMessage={errorMessage} />}
          <button
            id='close_update_avatar'
            type='button'
            onClick={handleClose}
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
          >
            ✕
          </button>
          <h3 className='font-bold text-lg m-2'>Edit avatar</h3>
          <fieldset disabled={isLoading}>
            <div className='form-control'>
              <label className='label' htmlFor='url'>
                URL:
              </label>
              <input
                className='input input-bordered m-2'
                placeholder='Url'
                {...register('url')}
                value={newAvatarUrl}
                onChange={(e) => setNewAvatarUrl(e.target.value)}
              />
              {errors.url && <span className='text-red-600'>{errors.url.message}</span>}
            </div>
            <button type='submit' className='btn btn-primary'>
              Edit
            </button>
          </fieldset>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateProfileForm;
