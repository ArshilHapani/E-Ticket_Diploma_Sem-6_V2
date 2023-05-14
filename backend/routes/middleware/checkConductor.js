import con from "../../database.js";

const checkConductor = (req, res, next) => {
  const check = `SELECT c_uname FROM conductor, login WHERE c_id='${req.user.id}' && c_id = id`;

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

export default checkConductor;
