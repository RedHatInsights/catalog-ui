export const createRows = (data) =>
  data.reduce(
    (acc, { id, name }, key) => [
      ...acc,
      {
        id,
        key,
        isOpen: false,
        cells: [name]
      }
    ],
    []
  );
