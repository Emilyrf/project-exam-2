import Select from 'react-select';

const continents = [
  { value: 'AF', label: 'Africa' },
  { value: 'AN', label: 'Antarctica' },
  { value: 'AS', label: 'Asia' },
  { value: 'EU', label: 'Europe' },
  { value: 'NA', label: 'North America' },
  { value: 'OC', label: 'Oceania' },
  { value: 'SA', label: 'South America' },
];

const ContinentSelect = ({ name, label, register, setValue, value }) => {
  const handleChange = (selectedOption) => {
    setValue(name, selectedOption.value);
  };

  return (
    <div className='form-control'>
      <label className='label' htmlFor={name}>
        {label}:
      </label>
      <Select
        options={continents}
        onChange={handleChange}
        value={continents.find((option) => option.value === value)}
      />
    </div>
  );
};

export default ContinentSelect;
