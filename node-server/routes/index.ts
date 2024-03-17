const router = require("express").Router();
const login = require("./login");
const listing = require("./listing");
const home = require("./home");
const register = require("./register");

// router.get("/", function (req: any, res: any, next: any) {
//   return res.status(200).json({ status: 200, message: `app server is running on port ${process.env.PORT}` });
// });

router.get(
  "/login",
  (req: any, res: any, next: any) => {
    // if (req.session?.appUser?.userId) {
    //   return res.status(200).json({ name: req.session.appUser?.firstName, status: 200 });
    // }
    next();
  },
  function (req: any, res: any, next: any) {
    return res.status(200);
  }
);

router.post("/login", function (req: any, res: any, next: any) {
  login.postHandler(req, res, next);
});

router.post("/logout", function (req: any, res: any, next: any) {
  login.logoutHandler(req, res, next);
});

router.get("/home", function (req: any, res: any, next: any) {
  home.getHandler(req, res, next);
});

router.get("/status", function (req: any, res: any, next: any) {
  res.status(200).json({ name: "akhil" });
});

router.post("/getListingWithId", function (req: any, res: any, next: any) {
  listing.postHandler(req, res, next);
});

router.post("/register", function (req: any, res: any, next: any) {
  register.postHandler(req, res, next);
});

router.get("/logout", function (req: any, res: any, next: any) {
  req.session.destroy();
  res.status(200).json({ name: "akhil" });
});

module.exports = router;
