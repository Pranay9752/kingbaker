function filterNonEmptyValues(inputObject) {
  return Object.entries(inputObject).reduce((acc, [key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

export default filterNonEmptyValues;
