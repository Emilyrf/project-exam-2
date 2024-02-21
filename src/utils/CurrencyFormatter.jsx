const CurrencyFormatter = ({ amount }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: 'NOK',
    }).format(amount);
  };

  return <span className='font-bold text-xl'>{formatCurrency(amount)}</span>;
};

export default CurrencyFormatter;
