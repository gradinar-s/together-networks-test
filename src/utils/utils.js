export const validate = (type, value) => {
  switch (type) {
    case "email": {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      return {
        isValid: regex.test(value),
        errorMessage: "Please enter a valid email address",
      };
    }
    default: {
      return {
        isValid: !!value.length,
        errorMessage: "The field is required",
      };
    }
  }
};

export const outputDataToConsole = (json) => {
  const strEnteredData = JSON.stringify(json, null, 3);
  const description = `I'd use JWT for authentication. We can discuss more details about it at the interview`;

  alert(`${strEnteredData}\n\n${description}`);
};

export const clearError = (source, fieldId) => {
  if (source) {
    const element = source.querySelector(fieldId);
    element?.remove();
  }
};
