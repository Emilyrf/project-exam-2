//add feedback messages
const DeleteVenueForm = () => {
  return (
    <dialog id='delete_venue' className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          {/* if there is a button in form, it will close the modal */}
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
        </form>
        <h3 className='font-bold text-lg'>Venue Name</h3>
        <p className='py-4'>Are you sure you want to delete this venue?</p>

        <button className='btn'>Delete</button>
      </div>
    </dialog>
  );
};
export default DeleteVenueForm;
