"use client";

import { useState, FormEvent } from "react";
import "./Contact.css";
import Image from "next/image";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
                <div className="social-links">
                  <div className="contact-detail-item">
                    <div className="detail-label">Email</div>
                    <a
                      href="mailto:&#71;&#101;&#105;&#99;&#107;&#115;&#116;&#101;&#100;&#116;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Geickstedt(at)gmail.com
                    </a>
                  </div>
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
              onSubmit={handleSubmit}
              data-netlify="false"
            >
              {submitStatus.type && (
                <div
                  className={`form-status ${
                    submitStatus.type === "success" ? "success" : "error"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
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
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Booking / Collab / Press"
                />
              </div>
              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your event or project"
                  rows={6}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
