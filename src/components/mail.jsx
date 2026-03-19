import nodemailer from "nodemailer"

export async function sendMail({ name, phone, email, message }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: import.meta.env.VITE_GMAIL_USER,
      pass: import.meta.env.VITE_GMAIL_APP_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: `"SPD Solutions Website" <${import.meta.env.VITE_GMAIL_USER}>`,
    to: "spdsolutions@gmail.com",
    subject: `New Contact Form Submission from ${name}`,
    html: `...same html as before...`,
    replyTo: email,
  })

  await transporter.sendMail({
    from: `"SPD Solutions" <${import.meta.env.VITE_GMAIL_USER}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}!`,
    html: `...same html as before...`,
  })
}