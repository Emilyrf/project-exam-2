const DateFormatter = ({ date }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('pt', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });
    };

    return <>{formatDate(date)}</>;
};

export default DateFormatter;