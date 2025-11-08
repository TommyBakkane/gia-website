import Link from "next/link";

export const metadata = {
  title: "Message Sent | GIA",
};

export default function ContactSuccessPage() {
  return (
    <main className="contact-success">
      <div className="contact-success-card">
        <h1>Message sent!</h1>
        <p>Thank you for reaching out. I&apos;ll get back to you soon.</p>
        <Link href="/" className="contact-success-link">
          Return to the site
        </Link>
      </div>
    </main>
  );
}
