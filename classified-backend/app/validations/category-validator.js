const categoryValidation = {
  name: {
    in: ["body"],
    exists: {
      errorMessage: "Name field is required",
    },
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    trim: true,
    toLowerCase: true,
    isAlpha: true,
  },
};

export default categoryValidation;
