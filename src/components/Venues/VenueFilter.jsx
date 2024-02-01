import { useState } from "react";
import { Link } from "react-router-dom";

function VenueFilter({ venues = [] }) {
	const [searchTerm, setSearchTerm] = useState("");

	console.log("ss", searchTerm);

	// computed property
	const filtervenues = venues.filter((venue) => venue.name.toLowerCase().includes(searchTerm.toLowerCase()));

	console.log("filtervenues", filtervenues);

	return (
		<div className="relative w-full mx-auto p-4 max-w-xs">
            <span className='text'>Where do you wanna go?</span>
			<input className='input input-bordered w-full max-w-xs px-4 py-2 mt-3 text-lg'type='text'
              placeholder='Type here' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value.trim())} />
			{filtervenues.length > 0 && searchTerm.length > 0 && (
				<ul className="absolute left-5 right-5 z-30 bg-gray-700">
					{filtervenues.map((venue) => {
						return (
							<li key={venue.id}>
								<Link to={`/venue/${venue.id}`} className="block p-4 hover:bg-primary">
									{venue.name}
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}

export default VenueFilter;
