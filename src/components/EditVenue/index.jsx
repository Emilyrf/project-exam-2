import { useState, useEffect } from 'react';
import { useStore } from '../../stores/useStore';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { fetchSingleVenue, editVenue } from '../../services/api/http';
import VenueForm from '../VenueForm';



const EditVenueForm = ({ venueId }) => {
    const token = useStore((state) => state.token);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [initialValues, setInitialValues] = useState(null);

    // useEffect(() => {
    //     const fetchVenueData = async () => {
    //         try {
    //             const response = await fetchSingleVenue(venueId, token);
    //             if (!response || !response.data) {
    //                 throw new Error('Empty response received');
    //             }
    //             const venueData = response.data;
    //             console.log('Fetched venue data:', venueData);
    //             setInitialValues(venueData);
    //         } catch (error) {
    //             console.error('Failed to fetch venue data:', error);
    //             // Handle error, e.g., setErrorMessage
    //         }
    //     };

    //     fetchVenueData();
    // }, [venueId, token]);

    // const onSubmit = async (data) => {
    //     try {
    //         const formData = {
    //             ...data,
    //             media: Array.isArray(data.media) ? data.media : [data.media]
    //         };

    //         const response = await editVenue(venueId, token, formData);
    //         if (response && response.data) {
    //             console.log('Venue update successful:', response.data);
    //             setSuccessMessage('Venue updated successfully!');
    //             setErrorMessage('');
    //         } else {
    //             throw new Error('Failed to update venue');
    //         }
    //     } catch (error) {
    //         setErrorMessage(error.message);
    //         setSuccessMessage('');
    //     }
    // };

    return (
        <div className='text-center'>
            {successMessage && <AlertSuccess message={successMessage} />}
            {errorMessage && <AlertError errorMessage={errorMessage} />}

            {/* {initialValues ? (
                <VenueForm onSubmit={onSubmit} initialValues={initialValues} />
            ) : (
                <p>Loading...</p>
            )} */}
            <VenueForm />

        </div>
    );
};
export default EditVenueForm;
