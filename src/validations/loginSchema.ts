import { yup } from "@services/yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .strict()
    .email()
    .required(),

  password: yup
    .string()
    .strict()
    .required(),
});
