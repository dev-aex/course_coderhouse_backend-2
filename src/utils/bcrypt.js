import { hashSync, compareSync, genSaltSync } from "bcrypt";

export const generateHash = (password) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

export const compareHash = (password, passwordHash) => {
  return compareSync(password, passwordHash);
};
