import { useParams } from 'react-router-dom';
// import EditVenueForm from '../../components/EditVenue';

export default function EditVenuePage() {
  const { id } = useParams();
  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold text-secondary m-5'>Edit your venue</h1>
      {/* <EditVenueForm venueId={id}/> */}
    </div>
  );
}