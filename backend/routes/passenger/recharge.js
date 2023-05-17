/* recharge.js is used to create an end point for conductor to recharge the balance of passenger*/

import { Router } from "express";
const router = Router();
import con from "../../database.js";

router.post("/", async (req, res) => {
  const { amount } = req.body;
  let success = false;

  // Generating recharge id using instance of Date
  const d = new Date();
  const payid =
    "R" +
    ("0" + d.getFullYear()).slice(3) +
    ("0" + d.getMonth()).slice(-2) +
    ("0" + d.getDate()).slice(-2) +
    ("0" + d.getHours()).slice(-2) +
    ("0" + d.getMinutes()).slice(-2) +
    ("0" + d.getSeconds()).slice(-2) +
    ("0" + d.getMilliseconds()).slice(-2);

  // Query to get balance of passenger
  const findPassanger = `SELECT p_balance FROM passenger WHERE p_id='${req.user.id}';`;

  try {
    // Checks the amount for recharge is less than 500 or not
    if (amount > 500) {
      res.json({ success, msg: "Amount should be less than 500" });
    } else {
      // Get the passenger balance
      con.query(findPassanger, (err, qres) => {
        if (err) {
          console.log(err.message);
          res.json({ success });
        } else if (qres.length > 0) {
          // Checks that addition of amount of recharge and the existing balance is grater than 10000 or not
          if (parseInt(qres[0].p_balance) + parseInt(amount) >= 10000) {
            res.json({ success, msg: "Balance is too much" });
          } else {
            // Starts transaction
            con.beginTransaction();

            // Query insert payment details into database
            const inTransaction = `INSERT INTO payment VALUES ('${payid}',${amount},'${req.user.id}','${req.user.id}',CURRENT_TIMESTAMP())`;

            // Query to add amount(balance) to the passenger
            const addBal = `UPDATE passenger SET p_balance=p_balance+${amount} WHERE p_id='${req.user.id}'`;

            // Inserting recharge related information into transaction table
            con.query(inTransaction, (err, qres) => {
              if (err) {
                console.log(err.message);
                res.json({ success });
              } else if (qres) {
                // Adding balance to passenger
                con.query(addBal, (err, qres) => {
                  if (err) {
                    console.log(err.message);
                    con.rollback();
                    res.json({ success });
                  } else if (qres.affectedRows > 0) {
                    con.commit();
                    success = true;
                    res.json({ success, msg: "Payment successful" });
                  } else {
                    con.rollback();
                    res.json({ success });
                  }
                });
              } else {
                con.rollback();
                res.json({ success });
              }
            });
          }
        } else {
          res.json({ success, msg: "User doesn't exist" });
        }
      });
    }
  } catch (error) {
    res.json({ error: error.message });
    res.status(500).send("Some error occured");
  }
});

export default router;
