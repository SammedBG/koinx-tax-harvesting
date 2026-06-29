export const formatCurrency = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) return '₹0.00';
  const abs = Math.abs(value);
  let formatted;
  if (abs >= 1e7) formatted = (abs / 1e7).toFixed(2) + 'Cr';
  else if (abs >= 1e5) formatted = (abs / 1e5).toFixed(2) + 'L';
  else formatted = abs.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return `${value < 0 ? '-' : ''}₹${formatted}`;
};

export const formatNumber = (value, decimals = 6) => {
  if (value === null || value === undefined || isNaN(value)) return '0';
  if (Math.abs(value) < 1e-10 && value !== 0) return value.toExponential(4);
  return value.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: decimals });
};

export const formatGain = (gain) => {
  if (!gain && gain !== 0) return { text: '₹0.00', positive: true };
  const positive = gain >= 0;
  return { text: formatCurrency(gain), positive };
};
