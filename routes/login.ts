const accessor = require("./../services/accessors");
const passwordM = require("./../services/password-manager");
const cryptoa = require("crypto");
const postHandler = async (req: any, res: any, next: any) => {
  const appUser = await accessor.gettAppUser(req.body.data?.username);
  if ((appUser.status = 200 && appUser.data)) {
    //const compare = await passwordM.comparePassword(req.body.data?.password, appUser.data.password);
    if (req.body.data?.password === appUser.data.password) {
      req.session.appUser = {
        username: req.body.data?.username,
        firstName: appUser.data?.firstName,
        userId: appUser.data?.userId,
        lastName: appUser.data?.lastName,
        sessionId: cryptoa.randomBytes(16).toString("hex"),
      };
      return res.status(200).json({ name: appUser.data?.firstName, status: 200 });
    }
    return res.status(500).json({ data: "PASSINVALID" });
  }

  return res.status(500).json({ data: "NOUSER" });
};

// const isUserLoggedIn = async (req: any, res: any, next: any) => {
// }

const logoutHandler = async (req: any, res: any, next: any) => {
  req.session.destroy();
  res.status(200).json();
};

module.exports = { postHandler, logoutHandler };
