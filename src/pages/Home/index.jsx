import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Banner from "../../components/Banner";
import VenueCard from "../../components/VenueCard";

const API_BASE_URL = 'https://nf-api.onrender.com/api/v1/holidaze/venues/';

export default function Homepage(){
    const { data, isLoading, error } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const response = await axios.get(API_BASE_URL);
            return response.data;
        },
    });
    console.log("Data from API:", data);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div>
             <Banner />
             <h1 className='text-3xl font-bold text-secondary m-5 text-center'>
                 Check out this amazing destinations:
             </h1>
             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8'>
             {data.map((venue) => (    
                <VenueCard key={venue.id} venue={venue} />
            ))}
             </div>

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
