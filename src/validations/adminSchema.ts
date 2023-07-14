import { yup } from "@services/yup";

export const getUserByIdSchema = yup.object().shape({
  id: yup
    .string()
    .strict()
    .uuid()
    .required(),
});
