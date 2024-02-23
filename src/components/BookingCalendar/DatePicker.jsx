import { useState } from 'react';
import { useStore } from '../../stores/useStore';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold;
    background-color: green; 
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
  }
`;

const CustomDatePicker = ({ bookedDates }) => {
  const setSelectedDateRange = useStore((state) => state.setSelectedDateRange);
  const [range, setRange] = useState();
  const defaultMonth = new Date();

  const disabledDays = [
    { before: new Date() }, // Disable past dates
    ...(bookedDates || []).map((booking) => ({
      from: new Date(booking.start),
      to: new Date(booking.end),
    })),
  ];
  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{range.from.toLocaleDateString()}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {range.from.toLocaleDateString()} – {range.to.toLocaleDateString()}
        </p>
      );
    }
  }

  const handleDateChange = (selectedRange) => {
    setRange(selectedRange);
    setSelectedDateRange(selectedRange);
  };

  return (
    <>
      <style>{css}</style>
      <DayPicker
        mode='range'
        defaultMonth={defaultMonth}
        fromMonth={defaultMonth}
        selected={range}
        footer={footer}
        onSelect={handleDateChange}
        disabled={disabledDays}
        modifiersClassNames={{
          selected: 'my-selected',
          today: 'my-today',
        }}
        modifiersStyles={{
          disabled: { fontSize: '75%' },
        }}
      />
    </>
  );
};

export default CustomDatePicker;
