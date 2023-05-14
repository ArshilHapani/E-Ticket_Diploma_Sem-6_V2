import con from "../../database.js";

const checkAdmin = (req, res, next) => {
  const check = `SELECT a_uname FROM admin, login WHERE a_id='${req.user.id}' && a_id = id;`;

  try {
    con.query(check, (err, qres) => {
      if (err) {
        console.log(err.message);
      } else if (qres.length > 0) {
        next();
      } else {
        res.json({
          success: false,
          msg: "Only Admin can access this information",
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

export default checkAdmin;
