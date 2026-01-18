import nodemailer from "nodemailer";
import { config } from "../../config/config";

export const transporter = nodemailer.createTransport({
  host: `${config.smtpHost}`,
  port: 587,
  secure: false,
  auth: {
    user: `${config.smtpUser}`,
    pass: `${config.smtpPassword}`,
  },
});
