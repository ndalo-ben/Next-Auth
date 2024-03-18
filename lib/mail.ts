import nodemailer from 'nodemailer';

export async function sendMail(
    { to, subject, body }:
        { to: string, subject: string, body: string }) {
    const { SMTP_EMAIL, SMTP_GMAIL_PASS } = process.env;
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "70732773505ee4",
            pass: "105f5378b17776"
        }
    });

    try {
        const sendResult = await transport.sendMail({
            from: SMTP_EMAIL,
            to,
            subject,
            html: body,
        });
        console.log({ sendResult });
    } catch (e) {
        console.log("Error connecting to email server", e);
    }
}