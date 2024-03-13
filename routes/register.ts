const accessors = require("./../services/accessors");
const passwordManager = require("./../services/password-manager");
export const postHandler = async (req: any, res: any, next: any) => {
  let userInfo = req.body?.data;
  const doesUserExist = await accessors.gettAppUser(userInfo.email);
  if (doesUserExist?.status === 500 && userInfo.email && userInfo.email && userInfo.password) {
    userInfo.userId = Math.floor(Math.random() * 1000) + "" + Date.now();
    //userInfo.password = await passwordManager.cryptPassword(userInfo.password);
    userInfo.isAdmin = false;
    delete userInfo["confirmPassword"];
    const response = await accessors.putItem(userInfo);
    if (response?.status === 200) {
      return res.send(200);
    } else {
      return res.send(500);
    }
  }
  return res.send(500);
};
