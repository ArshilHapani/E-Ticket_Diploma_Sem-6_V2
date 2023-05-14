/* fetchUser.js is used to create a middleware that is used to authenticate user and store id of user into req object to perform opertaions */

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Secret message that was used to create JWT
const SECRET_MSG = process.env.SECRET_KEY_JWT;

const fetchUser = (req, res, next) => {
  // Fetches JWT send in "authtoken" header and store it into "token" variable
  const token = req.header("authToken");

  // Checks token exists or not
  if (!token) {
    res
      .status(401)
      .send({ error: "Failed to authenticate user, please login again" });
  } else {
    try {
      // Verifying and Getting the object that contains id of user from the token
      const data = jwt.verify(token, SECRET_MSG);

      // Stores "id" of user into req.user object
      req.user = data;

      // Calling next function
      next();
    } catch (error) {
      res
        .status(401)
        .send({ error: "Failed to authenticate user, please login again" });
    }
  }
};

export default fetchUser;
