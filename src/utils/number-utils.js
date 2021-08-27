export const padDigits = (n, digits) => {
  const padding = digits - 1;
  return (n < 10 ** padding ? '0'.repeat(padding) : '') + n;
};
