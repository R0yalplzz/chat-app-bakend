import { WebUser } from "../schema/model.js";

let authorized = (roles) => {
  return async (req, res, next) => {
    let _id = req._id;
    let result = await WebUser.findById(_id);
    let tokenRole = result.role;
    if (roles.includes(tokenRole)) {
      next();
    } else {
      res.status(403).json({
        sucess: false,
        message: "User not authorized",
      });
    }
  };
};
export default authorized;
