const yup = require("yup");

const createValidator = yup.object({
  body: yup.object({
    name: yup.string().required(),
    year: yup.number().required(),
    description: yup.string().min(8).max(255).required(),
  }),
});

const updateValidator = yup.object({
  body: yup.object({
    name: yup.string().required(),
    year: yup.number().required(),
    description: yup.string().min(8).max(255).required(),
  }),
  params: yup.object({
    id: yup.string().required(),
  }),
});

const validate = (validator: any) => async (req: any, res: any, next: any) => {
  try {
    await validator.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err: any) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};

export { validate, updateValidator, createValidator };
