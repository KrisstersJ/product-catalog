export const ValidationFields = {
  sku: {
    pattern: /^[A-Za-z0-9]{8,12}$/,
    errorMessage:
      "SKU should contain between 8-12 characters and shouldn't include any special characters. Try again!",
  },
  name: {
    pattern: /^[A-Za-z0-9]+$/,
    errorMessage: "Name should only contain alphabets and spaces. Try again!",
  },
  price: {
    pattern: /^\d+(\.\d{1,2})?$/,
    errorMessage: "Price should be a valid number. Try again! ",
  },
  size: {
    pattern: /^\d+$/,
    errorMessage: "Size should contain only whole numbers. Try again!",
  },
  weight: {
    pattern: /^\d+(\.\d{1,1})?$/,
    errorMessage:
      "Weight should contain up to 1 decimal and should include only numbers. Try again!",
  },
  height: {
    pattern: /^\d+(\.\d{1,1})?$/,
    errorMessage:
      "Height should contain up to 1 decimal and shouldn't include any special characters. Try again!",
  },
  width: {
    pattern: /^\d+(\.\d{1,1})?$/,
    errorMessage:
      "Width should contain up to 1 decimal and shouldn't include any special characters. Try again!",
  },
  length: {
    pattern: /^\d+(\.\d{1,1})?$/,
    errorMessage:
      "Length should contain up to 1 decimal and shouldn't include any special characters. Try again!",
  },
};

export const getInputPlaceholder = (field, openType) => {
  switch (openType) {
    case "dvd":
      return field === "sku"
        ? "JVC200123"
        : field === "name"
        ? "Acme DISC"
        : field === "price"
        ? "1.00"
        : "";
    case "book":
      return field === "sku"
        ? "GGWP0007"
        : field === "name"
        ? "War and Peace"
        : field === "price"
        ? "20.00"
        : "";
    case "furniture":
      return field === "sku"
        ? "TR120555"
        : field === "name"
        ? "Chair"
        : field === "price"
        ? "40.00"
        : "";
    default:
      return "";
  }
};
