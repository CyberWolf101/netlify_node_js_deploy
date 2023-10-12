
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const serverless = require('serverless-http');
const app = express();
const router= express.Router()
app.use(bodyParser.json());

app.use(cors());
// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use the email service provider you prefer
  auth: {
    user: 'lordtimothy055@gmail.com',
    pass: 'xqnhmlcymsgqygsm',
  },
});

router.get('/', (req, res) => {
  res.send('Hello, World!');
})


router.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  console.log('Email Data Received:');
  console.log('To:', to);
  console.log('Subject:', subject);
  console.log('Text:', text);
  const emailContent = `
  <html>
    <head>
      <style>
        /* Your CSS styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Our Newsletter</h1>
        ${text}
        <p>Thank you for subscribing to our newsletter.</p>
        <p>This is an example email with custom styling.</p>
      </div>
    </body>
  </html>
`;


  const mailOptions = {
    from: 'lordtimothy055@gmail.com',
    to,
    subject,
    text,
    html: emailContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// app.listen(3001, () => {
//   console.log('Server is running on port 3001');
// });

app.use('/.netlify/functions/api', router)
module.exports.handler = serverless(app)