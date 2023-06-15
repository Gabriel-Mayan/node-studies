import handlebar from 'nodemailer-express-handlebars';
import { SendMailOptions, createTransport } from 'nodemailer';

import { mailConfig } from './aws';

const transporter = createTransport({
  SES: mailConfig
});

transporter.use('compile', handlebar({
  viewEngine: {
    extname: '.html',
    partialsDir: '../utils/email-template',
  },
  viewPath: '../utils/email-template',
  extName: '.html',
}));

export const sendEmail = async (mailOptions: SendMailOptions): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    transporter.sendMail(mailOptions, (error:  Error | null) => {
      if (error) {
        reject(error);
      };

      resolve(true);
    });
  });
}
