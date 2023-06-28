import { yup } from "@services/yup";
import { UserRepository } from "@repositiories/User";

export const createUserSchema = yup.object().shape({
  name: yup
    .string()
    .strict()
    .required(),
  // .test('equal', 'Invalid user name', async (userName) => testUserName(userName)),

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
  //  .min(8, "A senha deve ter pelo menos 8 caracteres"),
  //  .test('equal', 'A senha deve ter letras, números e símbolos', (pwd) => testPassword(pwd)),
});

export const createAdminSchema = yup.object().shape({
  userName: yup
    .string()
    .strict()
    .required(),
  // .test('equal', 'Invalid user name', async (userName) => testUserName(userName)),

  password: yup
    .string()
    .strict()
    .required()
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
  //  .test('equal', 'A senha deve ter letras, números e símbolos', (pwd) => testPassword(pwd)),
});
