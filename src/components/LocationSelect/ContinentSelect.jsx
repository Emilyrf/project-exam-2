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

const ContinentSelect = ({ name, label, register }) => {
  return (
    <div className='form-control'>
      <label className='label' htmlFor={name}>
        {label}:
      </label>
      <Select options={continents} {...register(name)} />
    </div>
  );
};

export default ContinentSelect;
