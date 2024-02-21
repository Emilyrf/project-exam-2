import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../../../stores/useStore';
import { updateProfileMedia } from '../../../services/api/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AlertError from '../../../components/Alerts/error';
import AlertSuccess from '../../../components/Alerts/success';

const validationSchema = yup.object().shape({
  url: yup.string().url('Please enter a valid URL').required('URL is required'),
});

const UpdateProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await updateProfileMedia(token, user.name, data.url);
      if (response.status === 200) {
        setUser({
          name: user.name,
          email: user.email,
          avatar: data.url,
          venueManager: user.venueManager,
        });
        setErrorMessage('');
        setSuccessMessage('Avatar atualizado!');
      }
    } catch (error) {
      setErrorMessage(`Error updating profile media: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    const modal = document.getElementById('update_avatar_modal');
    if (modal) {
      setSuccessMessage('');
      modal.close();
    }
  };

  return (
    <dialog id='update_avatar_modal' className='modal'>
      <div className='modal-box'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {errorMessage && <AlertError errorMessage={errorMessage} />}
          {successMessage && <AlertSuccess message={successMessage} />}
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
              <input className='input input-bordered m-2' placeholder='Url' {...register('url')} />
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
