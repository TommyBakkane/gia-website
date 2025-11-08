"use client";
import "./Contact.css";
import Image from "next/image";
import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export const Contact = () => {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("form-name", "contact");

    const payload = new URLSearchParams();
    formData.forEach((value, key) => {
      payload.append(key, value.toString());
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.statusText}`);
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("Netlify form submission error", error);
      setStatus("error");
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <Image
            src="/contact_image.jpg"
            alt="Contact"
            fill
            className="contact-image"
            style={{ objectFit: "cover" }}
          />
          <div className="image-overlay">
            <div className="contact-info">
              <h2>Contact</h2>
              <div className="contact-details">
                {/*
                <div className="contact-detail-item">
                  <div className="detail-label">Email</div>
                  <a href="mailto:Geickstedt@gmail.com">
                    Geickstedt(at)gmail.com
                  </a>
                </div>
                 */}
                <div className="social-links">
                  <div className="contact-detail-item">
                    <div className="detail-label">Instagram</div>
                    <a
                      href="https://instagram.com/Gia.offisiell"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @Gia.offisiell
                    </a>
                  </div>
                  <div className="contact-detail-item">
                    <div className="detail-label">TikTok</div>
                    <a
                      href="https://tiktok.com/@Gia.artist"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @Gia.artist
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <form
              className="contact-form"
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="form-hidden">
                <label htmlFor="bot-field">
                  Don&apos;t fill this out if you&apos;re human:
                </label>
                <input id="bot-field" name="bot-field" />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Booking / Collab / Press"
                />
              </div>
              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your event or project"
                  rows={6}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending..." : "Send"}
                </button>
              </div>
              {status === "success" && (
                <div className="form-status" role="status" aria-live="polite">
                  Message sent. I&apos;ll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="form-status error" role="alert">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
