import handlebar from "nodemailer-express-handlebars";
import { SendMailOptions, createTransport } from "nodemailer";
import { mailConfig } from "@services/aws";

const transporter = createTransport({
  SES: mailConfig,
});

transporter.use("compile", handlebar({
  viewEngine: {
    extname: ".html",
    partialsDir: "../utils/email-template",
  },
  viewPath: "../utils/email-template",
  extName: ".html",
}));

// eslint-disable-next-line max-len
export const sendMail = async (mailOptions: SendMailOptions): Promise<boolean> => new Promise<boolean>((resolve, reject) => {
  transporter.sendMail(mailOptions, (error: Error | null) => {
    if (error) {
      reject(error);
    }

    resolve(true);
  });
});
