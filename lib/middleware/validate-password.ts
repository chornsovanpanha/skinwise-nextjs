import bcrypt from "bcrypt";
export const validateUserPassword = async ({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}) => {
  return await bcrypt.compare(password, hashedPassword);
};
