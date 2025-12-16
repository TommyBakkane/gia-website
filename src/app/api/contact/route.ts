import FormData from "form-data";
import Mailgun from "mailgun.js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    const mailgun = new Mailgun(FormData);

    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY || "",
      url: "https://api.eu.mailgun.net",
    });

    const data = await mg.messages.create(process.env.MAILGUN_DOMAIN || "", {
      from:
        process.env.MAILGUN_FROM_EMAIL ||
        `Contact Form <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: ["tommy.ba95@gmail.com"],
      subject: subject || `Contact Form: ${name}`,
      html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
    });

    console.log(data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 },
    );
  }
}
