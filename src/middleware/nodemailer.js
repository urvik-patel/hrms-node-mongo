const nodemailer = require('nodemailer')
exports.sendMailService = (mailTo, mailSubject, mailHTML) => {
  const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'ump8ump8@gmail.com',
      pass: 'Urvik@8888'
    }
  })

  const mailOptions = {
    from: 'ump8ump@gmail.com',
    to: mailTo,
    subject: mailSubject,
    html: mailHTML
  }

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error)
    //   next()
    } else {
      console.log('Mail Sent!!', response)
    //   next()
    }
  })
}
