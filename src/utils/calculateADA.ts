export const calculateADA = (
  lovelace: string,
  fixed: number,
  unit?: boolean,
) => {
  if (lovelace.length > 15) {
    const num = parseInt(lovelace) / 1000000000000000;
    if (unit) {
      return num.toFixed(fixed) + ' B';
    }
    return num.toFixed(fixed);
  }
  if (lovelace.length > 12) {
    const num = parseInt(lovelace) / 1000000000000;
    if (unit) {
      return num.toFixed(fixed) + ' M';
    }
    return num.toFixed(fixed);
  }
  if (lovelace.length > 9) {
    const num = parseInt(lovelace) / 1000000000;
    if (unit) {
      return num.toFixed(fixed) + ' K';
    }
    return num.toFixed(fixed);
  } else {
    const num = parseInt(lovelace) / 1000000;
    return num.toFixed(fixed);
  }
};
