import { Request, Response } from "express";
import { RequestWithUserRole } from "types/express";
import { ICreateUser, IUpdatedUser } from "types/user";

import { UserRepository } from "@repositories/User";
import { UserTypeRepository } from "@repositories/UserType";
import { RecoveryPasswordRepository } from "@repositories/RecoveryPassword";

import { addTime, isAfterDate } from "@helpers/handleDate";
import { generateUuid } from "@helpers/handleUuid";
import { formatDatabaseUser } from "@helpers/utils";
import { encryptPassword } from "@helpers/handlePassword";

import { sendMail } from "@services/nodemailer";

export const getUsers = async (request: Request, response: Response) => {
  try {
    const users = await UserRepository.getUsers();

    if (!users.length) {
      return response.status(404).json({ message: "Não há usuários cadastrados..." });
    }

    return response.status(200).json(users);
  } catch (error) {
    return response.status(400).json({ message: "Erro ao trazer informações de usuários..." });
  }
};

export const getUserById = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const user = await UserRepository.findUser({ id });

    if (!user) {
      return response.status(404).json("Não foi encontrado usuário com este id...");
    }

    const { password, ...userData } = user;

    return response.status(200).json(userData);
  } catch (error) {
    return response.status(400).json({ message: "Erro ao trazer informações de usuário..." });
  }
};

export const createUser = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  try {
    const userType = await UserTypeRepository.findType({ name: "Regular" });

    if (!userType) {
      return response.status(400).json({ message: "Erro ao criar novo usuário:" });
    }

    const newUser: ICreateUser = {
      name,
      email,
      password: await encryptPassword(password),
      userType,
    };

    const insertedUser = await UserRepository.createUser(newUser);
    const formattedUser = formatDatabaseUser(insertedUser);

    return response.status(200).json({ message: "Cliente cadastrado com sucesso!", user: formattedUser });
  } catch (error) {
    return response.status(400).json({ message: "Erro ao criar novo usuário..." });
  }
};

export const updateUser = async (request: RequestWithUserRole, response: Response) => {
  try {
    const { user } = request;
    const { name, email, password } = request.body;

    if (!user) {
      return response.status(400).json("Erro ao atualizar usuário:");
    }

    const updatedData: IUpdatedUser = {
      name: name !== user.name ? name : undefined,
      email: email !== user.email ? email : undefined,
      password: password ? await encryptPassword(password) : undefined,
    };

    await UserRepository.updateUser(user.id, updatedData);

    return response.status(200).json({ message: "Cliente atualizado com sucesso" });
  } catch (error) {
    return response.status(400).json({ message: "Erro ao atualizar usuário..." });
  }
};

export const deleteUser = async (request: RequestWithUserRole, response: Response) => {
  const { user } = request;

  if (!user || !!user.deletedAt) {
    return response.status(404).json("Usuário já deletado...");
  }

  const deletedUser = await UserRepository.deleteUser(user.id);

  if (!deletedUser) {
    return response.status(400).json("Não foi possível apagar os dados do usuário.");
  }

  return response.status(200).json("Usuário apagado com sucesso");
};

export const toggleUserStatus = async (request: Request, response: Response) => {
  const { id } = request.params;

  const user = await UserRepository.findUser({ id });

  if (!user) {
    return response.status(404).json("Não foi encontrado usuário com este id. Informe um id de usuário diferente.");
  }

  const updatedStatus = await UserRepository.updateUser(id, { isActive: !user.isActive });

  if (!updatedStatus) {
    return response.status(400).json("Não foi possível atualizar o status do usuário.");
  }

  return response.status(200).json("Status do usuário atualizado com sucesso");
};

export const recoveryUserPassword = async (request: Request, response: Response) => {
  const { email } = request.body;

  const user = await UserRepository.findUser({ email });

  if (!user) {
    return response.status(404).json("User does not exist");
  }

  const insertedInfo = await RecoveryPasswordRepository.createRecovery({
    id: generateUuid(),
    expiresIn: addTime(new Date(), { hours: 3 }),
    user,
  });

  if (!insertedInfo) {
    return response.status(404).json("error insert uuid in database");
  }

  const emailSent = await sendMail({
    from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_USERNAME}>`,
    to: user.email,
    subject: "Password Recovery",
    // TODO dar um jeito nisso aqui
    // template: "recovery-password/index",
    // context: {
    //   linkRecoveryPassword: `${process.env.URL_RECOVERY_PASSWORD}/${insertedInfo.id}`,
    //   linkWhatsapp: process.env.URL_WHATSAPP,
    // },
    // attachments: recoveryAttachments,
  });

  if (!emailSent) {
    return response.status(400).json("Failed to send email.");
  }

  return response.status(200).json("Email successfully sent!");
};

export const updateUserPassword = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { password } = request.body;

  const registeredRequest = await RecoveryPasswordRepository.findRecovery({ id });

  if (!registeredRequest) {
    return response.status(404).json("Request does not exist");
  }

  const expiredTime = isAfterDate(new Date(), registeredRequest.expiresIn);

  if (expiredTime) {
    return response.status(400).json("Request error: expired uuid.");
  }

  const newPassword = await encryptPassword(password);
  const userUpdated = await UserRepository.updateUser(id, { password: newPassword });

  if (!userUpdated) {
    return response.status(400).json("unable to update password.");
  }

  return response.status(200).json("password retrieved successfully");
};
