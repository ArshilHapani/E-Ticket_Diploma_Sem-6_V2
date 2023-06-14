import express from "express";
const router = express.Router();
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

router.patch("/", (req, res) => {
  let success = false;
  const { f_id, reply } = req.body;
  const getUser = `SELECT passenger.p_email FROM passenger, feedback WHERE feedback.f_id = '${f_id}' && passenger.p_id = feedback.p_id`;
  const setFeedback = `UPDATE feedback SET a_id='${req.user.id}', reply='${reply}', f_status='Replied', r_time=CURRENT_TIMESTAMP() WHERE f_id='${f_id}'`;

  try {
    con.query(getUser, (err, qres) => {
      if (err) {
        console.log(err.message);
        res.json({ success });
      } else if (qres.length > 0) {
        const passenger_email = qres[0].p_email;
        con.query(setFeedback, (err, qres) => {
          if (err) {
            console.log(err.message);
            res.json({ success });
          } else if (qres.affectedRows > 0) {
            const mailOptions = {
              from: email_user,
              to: passenger_email,
              subject: "Reply from E-Ticket",
              html: `
                                <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                                <div style="margin:50px auto;width:70%;padding:20px 0">
                                    <div style="border-bottom:1px solid #eee">
                                    <a href="https://e-ticket-user.netlify.app" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">E-Ticket</a>
                                    </div>
                                    <p style="font-size:1.1em">Hi,</p>
                                    <p> <b> Thank you for contacting us we appreciate your feedback the further reply from admin is, </b> <br/><br/>${reply} </p>                                    
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
                res.json({ success, msg: `Reply sent successfully` });
              }
            });
          } else {
            res.json({ success });
          }
        });
      } else {
        res.json({ success });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Some error occured");
  }
});

export default router;
