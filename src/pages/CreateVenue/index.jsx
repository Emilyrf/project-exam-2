import CreateVenueForm from '../../components/CreateVenue';

export default function CreateVenuePage() {
  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold text-secondary m-5'>Create a new venue</h1>
      <CreateVenueForm />
    </div>
  );
}
