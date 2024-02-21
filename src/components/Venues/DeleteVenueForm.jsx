import { useState } from 'react';
import { deleteVenue } from '../../services/api/api';
import { useStore } from '../../stores/useStore';
import AlertSuccess from '../Alerts/success';
import AlertError from '../Alerts/error';

const DeleteVenueForm = ({ id, name, onDeleteSuccess, onDeleteError }) => {
  const token = useStore((state) => state.token);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteVenue(id, token);
      if (response.status === 204) {
        setDeleteSuccess(true);
        onDeleteSuccess();
      } else {
        setDeleteError('Unexpected response status');
        onDeleteError('Unexpected response status');
      }
    } catch (error) {
      console.error('Error deleting venue', error);
      setDeleteError('Error deleting venue');
      onDeleteError('Error deleting venue');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <dialog data-id={id} id='delete_venue' className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
        </form>
        <h3 className='font-bold text-lg'>{name}</h3>
        <p className='py-4'>Are you sure you want to delete this venue?</p>

        {deleteSuccess && <AlertSuccess message='Venue deleted successfully!' />}
        {deleteError && <AlertError errorMessage={deleteError} />}

        <button className='btn' onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </dialog>
  );
};
export default DeleteVenueForm;
