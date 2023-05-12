// sendEmails.js

import { Router } from "express";
const router = Router();
import con from "../../database.js";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const email_pass = process.env.EMAIL_PASS;
const email_user = process.env.EMAIL_USER;

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: email_user,
    pass: email_pass,
  },
});

router.post("/", (req, res) => {
  const { message } = req.body;
  let success = false;

  const getEmails = `SELECT p_email FROM passenger;`;

  con.query(getEmails, (err, qres) => {
    if (err) {
      console.log(err.message);
      res.json({ success });
    } else if (qres.length > 0) {
      for (let i = 0; i < qres.length; i++) {
        // Setting up details to send email to the users
        const mailOptions = {
          from: email_user,
          to: qres[i].p_email,
          subject: "E-Ticket",
          html: message,
        };

        // Sending email to users
        transporter.sendMail(mailOptions, function (error) {
          if (error) {
            console.log(error);
            res.json({ success });
          }
        });
      }

      res.json({ success: true });
    } else {
      res.json({ success });
    }
  });
});

export default router;
