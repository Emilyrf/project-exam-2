import { useState } from 'react';
import { deleteBooking } from '../../../services/api/http';
import { useStore } from '../../../stores/useStore';
import AlertSuccess from '../../../components/Alerts/success';
import AlertError from '../../../components/Alerts/error';


const DeleteBookingForm = ({ id, onDeleteSuccess, onDeleteError }) => {
  const token = useStore((state) => state.token);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const bookings = useStore((state) => state.bookings);
  const setBookings = useStore((state) => state.setBookings);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteBooking(id, token);
      if (response.status === 204) {
        let newBookings = bookings.filter(booking => booking.id !== id)
        setBookings(newBookings);
        setDeleteSuccess(true);
        onDeleteSuccess();
      } else {
        setDeleteError('Unexpected response status');
        onDeleteError('Unexpected response status');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      setDeleteError('Error deleting booking');
      onDeleteError('Error deleting booking');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <dialog id='delete_booking' className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
        </form>
        <h3 className='font-bold text-lg'>Venue Name</h3>
        <p className='py-4'>Are you sure you want to delete this Booking?</p>

        {deleteSuccess && <AlertSuccess message='Booking deleted successfully!' />}
        {deleteError && <AlertError errorMessage={deleteError} />}

        <button className='btn' onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </dialog>
  );
};

export default DeleteBookingForm;