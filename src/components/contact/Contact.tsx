"use client";
import "./Contact.css";
import { useState } from "react";
import Image from "next/image";

export const Contact = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

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
              <h2>Let&apos;s Connect</h2>
              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="detail-label">Email</div>
                  <a href="mailto:Geickstedt@gmail.com">
                    Geickstedt(at)gmail.com
                  </a>
                </div>
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
              onSubmit={(e) => {
                e.preventDefault();
                setStatus("submitting");
                setTimeout(() => {
                  setStatus("success");
                  (e.target as HTMLFormElement).reset();
                }, 800);
              }}
            >
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
                <button>
                  {status === "submitting" ? "Sending..." : "Send"}
                </button>
              </div>
              {status === "success" ? (
                <div className="form-status" role="status" aria-live="polite">
                  Message sent. I&apos;ll get back to you soon.
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
