import { yup } from "@services/yup";
import { UserRepository } from "@repositories/User";

export const createUserSchema = yup.object().shape({
  name: yup
    .string()
    .strict()
    .required(),

  email: yup
    .string()
    .strict()
    .email()
    .required()
    .test("unique-email", "Usuário já cadastrado.", async (email) => {
      const hasUser = await UserRepository.findUser({ email });
      return !hasUser;
    }),

  password: yup
    .string()
    .strict()
    .required(),
});

export const updateUserSchema = yup.object().shape({
  name: yup
    .string()
    .strict(),

  email: yup
    .string()
    .strict()
    .email(),

  password: yup
    .string()
    .strict(),
});
