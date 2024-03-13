// const bcrypt = require("bcrypt");
const cryptPassword = (password: string) => {
  //   return bcrypt
  //     .genSalt(10)
  //     .then((salt: any) => bcrypt.hash(password, salt))
  //     .then((hash: any) => hash);
};

const comparePassword = (password: string, hashPassword: string) => {
  //   return bcrypt.compare(password, hashPassword).then((resp: any) => resp);
};

module.exports = { cryptPassword, comparePassword };
