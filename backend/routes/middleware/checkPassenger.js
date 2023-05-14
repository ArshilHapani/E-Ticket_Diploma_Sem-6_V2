import con from "../../database.js";

const checkPassenger = (req, res, next) => {
  const check = `SELECT p_uname FROM passenger, login WHERE p_id='${req.user.id}' && p_id = id`;

  try {
    con.query(check, (err, qres) => {
      if (err) {
        console.log(err.message);
      } else if (qres.length > 0) {
        next();
      } else {
        res.json({
          success: false,
          msg: "Failed to authenticate user, please login again",
        });
      }
    });
  } catch (error) {
    res.json({
      success: false,
      msg: "Failed to authenticate user, please login again",
    });
  }
};

export default checkPassenger;
