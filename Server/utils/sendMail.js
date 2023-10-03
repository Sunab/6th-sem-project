import  nodeMailer  from "nodemailer";

export const sendMail = async (email,subject,text) => {
  const transport = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    // secure:true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

 await transport.sendMail({
  from: "sunabbaskota@gmail.com",
    to: email,
    subject,
    text,
});
};
