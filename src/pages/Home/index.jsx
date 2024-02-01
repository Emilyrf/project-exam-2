import { useQuery } from '@tanstack/react-query';
import Banner from '../../components/Banner';
import VenuesList from '../../components/Venues/VenueList';
import { fetchVenues } from '../../services/api/api';
import VenueFilter from '../../components/Venues/VenueFilter';

const API_BASE_URL = 'https://nf-api.onrender.com/api/v1/holidaze/venues/';

export default function Homepage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['repoData'],
    queryFn: fetchVenues,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log('Data from API:', data);

  return (
    <div>
      <Banner />
      <h1 className='text-3xl font-bold text-secondary m-5 text-center'>
        Check out this amazing destinations:
      </h1>
      <VenuesList venues={data} />
    </div>
  );
}

// export default function Homepage() {
//     const [error, setError] = useState();
//     const [isLoading, setIsLoading] = useState(false);
//     const [venues, setVenues] = useState([]);

//     useEffect(() => {
//         const fetchVenues = async () => {
//             setIsLoading(true);

//             try {
//                 const response = await fetch(API_BASE_URL);
//                 const venues = await response.json();
//                 setVenues(venues);
//             } catch (error) {
//                 setError(error)
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//         fetchVenues();

//     }, []);

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Something went wrong! Please try again.</div>;
//     }

//     //on pagination : https://www.youtube.com/watch?v=00lxm_doFYw&list=PLApy4UwQM3UqAkfITNFzlqoD__UI6X5pb&index=1

//     return (
//         <div className="tutorial">
//             <h1 className="mb-4 text-2xl">Data Fetching in React</h1>

//             <ul>
//                 {venues.map((venue) => {
//                     return <li key={venue.id}>{venue.name}</li>;
//                 })}
//             </ul>

//         </div>
//     );
// }
