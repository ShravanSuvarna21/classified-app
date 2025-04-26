const IdValidation = {
  id: {
    in: ["params"],
    isMongoId: {
      errorMessage: "Please enter valid mongoDB id",
    },
  },
};

export default IdValidation;
