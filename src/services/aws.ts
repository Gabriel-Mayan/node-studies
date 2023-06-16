import * as AWS from "aws-sdk";

const mailConfig = new AWS.SES({
  apiVersion: "2010-12-01",
  region: process.env.AWS_EMAIL_REGION,
});

export default mailConfig;
