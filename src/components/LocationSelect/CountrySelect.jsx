import React from 'react';
import Select from 'react-select';
import CountryList from 'react-select-country-list';

const countries = CountryList().getData();
const countryOptions = countries.map((country) => ({
  value: country.value,
  label: country.label,
}));

const CountrySelect = ({ name, label, register, setValue, value }) => {
  const handleChange = (selectedOption) => {
    setValue(name, selectedOption.label); 
  };

  return (
    <div className='form-control'>
      <label className='label' htmlFor={name}>
        {label}:
      </label>
      <Select
        options={countryOptions}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};


export default CountrySelect;
