/* fetchPayment.js is used to create an end point for passenger to fetch all payments have been done by conductor to him/her*/

import { Router } from "express";
const router = Router();
import con from "../../database.js";

router.get("/", async (req, res) => {
  // Query to get data
  const fetchPaymentC = `SELECT payment.pay_time, payment.pay_amount, payment.pay_id, conductor.c_uname as paid_by FROM payment, conductor WHERE payment.p_id='${req.user.id}' && payment.c_id = conductor.c_id ORDER BY pay_time DESC;`;
  const fetchPaymentP = `SELECT payment.pay_time, payment.pay_amount, payment.pay_id, passenger.p_uname as paid_by FROM payment, passenger WHERE payment.p_id='${req.user.id}' && payment.c_id = passenger.p_id ORDER BY pay_time DESC;`;
  let success = false;

  try {
    // Fetching Payments
    con.query(fetchPaymentC, (err, cqres) => {
      if (err) {
        console.log(err.message);
        res.json({ success });
      } else if (cqres.length > 0) {
        con.query(fetchPaymentP, (err, pqres) => {
          if (err) {
            console.log(err.message);
            res.json({ success });
          } else if (pqres.length > 0) {
            pqres.map((i) => {
              const date = new Date(i.pay_time);
              const paytime = date.toLocaleString();
              i.pay_time = paytime;
            });

            cqres.map((i) => {
              const date = new Date(i.pay_time);
              const paytime = date.toLocaleString();
              i.pay_time = paytime;
              pqres.push(i);
            });

            success = true;
            res.json({ success, payments: pqres });
          } else {
            cqres.map((i) => {
              const date = new Date(i.pay_time);
              const paytime = date.toLocaleString();
              i.pay_time = paytime;
            });

            success = true;
            res.json({ success, payments: cqres });
          }
        });
      } else {
        con.query(fetchPaymentP, (err, pqres) => {
          if (err) {
            console.log(err.message);
            res.json({ success });
          } else if (pqres.length > 0) {
            pqres.map((i) => {
              const date = new Date(i.pay_time);
              const paytime = date.toLocaleString();
              i.pay_time = paytime;
            });

            success = true;
            res.json({ success, payments: pqres });
          } else {
            res.json({ success, payments: pqres });
          }
        });
      }
    });
  } catch (error) {
    res.json({ error: error.message });
    res.status(500).send("Some error occured");
  }
});

export default router;
