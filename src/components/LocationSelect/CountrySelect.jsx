import Select from 'react-select';
import CountryList from 'react-select-country-list';

const countries = CountryList().getData();
const countryOptions = countries.map((country) => ({
  value: country.value,
  label: country.label,
}));

const CountrySelect = ({ name, label, register }) => {
  return (
    <div className='form-control'>
      <label className='label' htmlFor={name}>
        {label}:
      </label>
      <Select options={countryOptions} {...register(name)} />
    </div>
  );
};

export default CountrySelect;
