import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendWelcomeMail = async (name: string, email: string) => {
    if(!name || !email) {
        return { success: false, message: "Fill all the required fields!" };
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: `"QweRty" <${process.env.NODEMAILER_EMAIL}>`,
            to: email,
            subject: "Welcome to our platform!",
            html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to QweRty</title>
                </head>
                <body style="margin:0; padding:0; font-family:Arial, Helvetica, sans-serif; background-color:#fdf2f8;">

                <!-- Container -->
                <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
                    
                    <!-- Header -->
                    <tr>
                    <td align="center" style="background:#ec4899; padding:30px;">
                        <h1 style="margin:0; font-size:28px; color:#ffffff; font-weight:bold;">
                        Welcome to <span style="color:#ffe4ec;">QweRty</span>
                        </h1>
                    </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                    <td style="padding:30px;">
                        <p style="font-size:16px; color:#333333; margin:0 0 15px 0;">Hi <strong>{{name}}</strong>, 👋</p>
                        
                        <p style="font-size:16px; color:#444444; line-height:1.6; margin:0 0 15px 0;">
                        We’re so excited to have you with us! With <strong>QweRty</strong>, you can design beautiful and customizable QR codes for any purpose — from business to personal use.
                        </p>
                        
                        <ul style="font-size:16px; color:#444444; padding-left:20px; margin:15px 0; line-height:1.6;">
                        <li>✨ Create <strong>custom QR codes</strong> instantly</li>
                        <li>✨ Manage all your <strong>QR history</strong> in one place</li>
                        <li>✨ Upgrade your brand with <strong>smart QR solutions</strong></li>
                        </ul>

                        <p style="font-size:16px; color:#444444; line-height:1.6; margin:20px 0;">
                        You’re all set! Click the button below and start creating your first QR code today.
                        </p>

                        <!-- CTA Button -->
                        <div style="text-align:center; margin:30px 0;">
                        <a href="https://qwerty.site/new-qr" 
                            style="background:#ec4899; color:#ffffff; padding:14px 30px; 
                                    text-decoration:none; border-radius:8px; font-size:16px; font-weight:bold; display:inline-block;">
                            Generate Your First QR
                        </a>
                        </div>

                        <p style="font-size:14px; color:#666666; line-height:1.6; margin:0 0 15px 0;">
                        Need help? Just reply to this email, and our friendly support team will be happy to assist.  
                        </p>

                        <p style="font-size:16px; color:#333333; margin:0;">Cheers,<br><strong>The QweRty Team</strong></p>
                    </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                    <td align="center" style="background:#fdf2f8; padding:20px; font-size:12px; color:#888888;">
                        <p style="margin:0;">You received this email because you signed up on QweRty.<br>
                        If this wasn’t you, simply ignore this email.</p>
                    </td>
                    </tr>
                </table>

                </body>
                </html>
            `,
        });

        console.log("Message sent:", info.messageId);
        return { success: true, message: "Email sent successfully.", info };
    } catch (error) {
        console.log("Error sending email: ", error);
        return { success: false, message: "Internal Server Error!" };
    }
}

export default sendWelcomeMail;