export const validateCustomer = (customer) => {
  return (res, req, next) => {
    const { error } = customer.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((err) => err.message);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  };
};
