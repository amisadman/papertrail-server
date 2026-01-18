import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  connectionString: process.env.DATABASE_URL,
  appUrl: process.env.APP_URL,
  smtpHost: process.env.SMTP_HOST,
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASS,
};
