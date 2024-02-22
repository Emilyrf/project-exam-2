import { useParams } from 'react-router-dom';
import VenueForm from '../../components/Venues/VenueForm';

export default function EditVenuePage() {
  const { id } = useParams();
  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold text-secondary m-5'>Edit your venue</h1>
      <VenueForm venueId={id} />
    </div>
  );
}
