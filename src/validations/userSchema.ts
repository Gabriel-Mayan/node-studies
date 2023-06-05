import yup from '../services/yup';

export const createUserSchema = yup.object().shape({
  userName: yup
    .string()
    .strict()
    .required(),
    //.test('equal', 'Invalid user name', async (userName) => testUserName(userName)),

  password: yup
    .string()
    .strict()
    .required()
    .min(8, 'A senha deve ter pelo menos 8 caracteres'),
    //.test('equal', 'A senha deve conter uma combinação de letras, números e símbolos', (password) => testPassword(password)),
});
