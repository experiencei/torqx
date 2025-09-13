import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // ✅ 1. Send notification email to you
    await resend.emails.send({
      from: `Torqx AI <${process.env.RESEND_FROM_EMAIL}>`,
      to: ["ayelojahighbee01@gmail.com"],
      subject: "📩 New Contact Form Submission",
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // ✅ 2. Auto-reply to the user
    await resend.emails.send({
      from: `Torqx AI <${process.env.RESEND_FROM_EMAIL}>`,
      to: [email],
      subject: "🚀 Thanks for contacting Torqx AI!",
      html: `
        <h2>Hi ${name || "there"},</h2>
        <p>Thanks for reaching out to <strong>Torqx AI</strong>. We’ve received your message and our team will be in touch soon.</p>
        <br/>
        <p>In the meantime, feel free to follow us for updates 🚀</p>
        <p>– The Torqx AI Team</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
