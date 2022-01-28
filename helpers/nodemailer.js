
  
const nodemailer = require('nodemailer');

function registerMail(email) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'memeitnowH8@gmail.com',
        pass: process.env.nodemailerPassword
      },
      tls: {
        rejectUnauthorized: false
    }
    });

    let mailOptions = {
      from: 'memeitnowH8@gmail.com',
      to: email,
      subject: `Thankyou for registering at MEME IT NOW !`,
      text: `Welcome, ${email}. Make some post yea ? come here https://meme-it-now.web.app/`
      
    };

    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log('Email sent: ' + info.response);
    });
  }

module.exports = registerMail