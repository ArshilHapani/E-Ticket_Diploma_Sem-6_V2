/* sendPin.js is used to create an end point for user to send mail for verification to change the password */

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

router.post("/verifyEmail", (req, res) => {
  const { email } = req.body;
  let success = false;
  const pin = Math.floor(Math.random() * 1000000 + 1);

  const mailOptions = {
    from: email_user,
    to: email,
    subject: "OTP For E-Ticket",
    html: `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="https://e-ticket-user.netlify.app" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">E-Ticket</a>
        </div>
        <p style="font-size:1.1em">Hi,Welcome to E-Ticket</p>
        <p>Thank you for using E-Ticket. Use the following OTP to complete your sign up authentication procedures.</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${pin.toString()}</h2>
        <p style="font-size:0.9em;">Regards,<br />E-Ticket</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>E-Ticket Inc</p>
          <p>Surat</p>
          <p>Gujarat</p>
        </div>
      </div>
    </div>
    
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json({ success });
    } else if (info) {
      let emailadd = email;
      success = true;

      let i,
        str = "";
      for (
        i = 0;
        emailadd.slice(2, emailadd.indexOf("@") - 4).length > i;
        i++
      ) {
        str += "*";
      }

      emailadd = emailadd.replace(
        emailadd.slice(2, emailadd.indexOf("@") - 4),
        str
      );

      res.json({ success, pin: pin, msg: `OTP sent to ${emailadd}` });
    }
  });
});

router.post("/changePwd", (req, res) => {
  const { uname } = req.body;
  let success = false;
  const pin = Math.floor(Math.random() * 1000000 + 1);

  const getUser = `SELECT id FROM login WHERE uname='${uname}';`;

  con.query(getUser, (err, qres) => {
    if (err) {
      console.log(err.message);
      res.json({ success });
    } else if (qres.length > 0) {
      const checkPassenger = `SELECT p_email FROM passenger WHERE p_id='${qres[0].id}';`;
      const checkConductor = `SELECT c_email FROM conductor WHERE c_id='${qres[0].id}';`;
      const checkAdmin = `SELECT a_email FROM admin WHERE a_id='${qres[0].id}';`;

      const user = new Promise((resolve, reject) => {
        con.query(checkPassenger, (err, qres) => {
          if (err) {
            console.log(err.message);
            res.json({ success });
          } else if (qres.length > 0) {
            resolve(qres[0].p_email);
          } else {
            con.query(checkConductor, (err, qres) => {
              if (err) {
                console.log(err.message);
                res.json({ success });
              } else if (qres.length > 0) {
                resolve(qres[0].c_email);
              } else {
                con.query(checkAdmin, (err, qres) => {
                  if (err) {
                    console.log(err.message);
                    res.json({ success });
                  } else if (qres.length > 0) {
                    resolve(qres[0].a_email);
                  } else {
                    res.json({ success });
                  }
                });
              }
            });
          }
        });
      });

      user
        .then((user_email) => {
          const mailOptions = {
            from: email_user,
            to: user_email,
            subject: "OTP For E-Ticket",
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="https://e-ticket-user.netlify.app" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">E-Ticket</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for using E-Ticket. Use the following OTP to complete your reset password authentication procedures.</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${pin.toString()}</h2>
                <p style="font-size:0.9em;">Regards,<br />E-Ticket</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>E-Ticket Inc</p>
                  <p>Surat</p>
                  <p>Gujarat</p>
                </div>
              </div>
            </div>
            `,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res.json({ success });
            } else if (info) {
              success = true;

              let i,
                str = "";
              for (
                i = 0;
                user_email.slice(2, user_email.indexOf("@") - 4).length > i;
                i++
              ) {
                str += "*";
              }

              user_email = user_email.replace(
                user_email.slice(2, user_email.indexOf("@") - 4),
                str
              );
              res.json({ success, pin: pin, msg: `OTP sent to ${user_email}` });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.json({ success, msg: "User does not exist" });
    }
  });
});

export default router;
