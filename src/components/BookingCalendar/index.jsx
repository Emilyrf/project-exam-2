import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns'; // Import addMonths from date-fns
import 'react-datepicker/dist/react-datepicker.css';

const BookingCalendar = ({ onSelectDate }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleBookNowClick = () => {
        // Perform actions when the "Book Now" button is clicked
        console.log('Book Now button clicked!');
        console.log('Selected date:', startDate);
    };

    return (
        <div className='text-center ml-auto'>
            <h3 className="text-lg font-semibold text-secondary">Select a Date: </h3>
            <DatePicker className='text-center'
                selected={startDate}
                onChange={onChange}
                minDate={new Date()}
                maxDate={addMonths(new Date(), 5)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                showDisabledMonthNavigation
            />
            <div>
            <button className="btn btn-primary mt-3" onClick={handleBookNowClick}>Book Now</button>
            </div>
        </div>
    );
};

export default BookingCalendar;
