import { prisma } from "../libs/prisma";
import { hash } from "bcrypt";

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return null;
  const hashPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email:email.toLocaleLowerCase(),
      password: hashPassword,
    },
  });
  if(!user) return null
  return({
    id:user.id,
    name:user.name,
    email:user.email
  })
};
