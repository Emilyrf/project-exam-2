import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const CustomDatePicker = () => {
  const disabledDays = [
    new Date(2024, 5, 10),
    new Date(2024, 5, 12),
    new Date(2024, 5, 20),
    { from: new Date(2024, 4, 18), to: new Date(2024, 4, 29) }
  ];

  return (
    <DayPicker
      mode='range'
      selected={new Date()} // Defina a data selecionada, se necessário
      disabled={disabledDays}
    />
  );
};

export default CustomDatePicker;
