export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

export const getUniqueValues = (type, value) => {
  let tempValue = value.map((item) => {
    return item[type];
  });

  if (type === 'colors') {
    tempValue = tempValue.flat();
  }

  tempValue = [...new Set(['all', ...tempValue])];

  return tempValue;
};
