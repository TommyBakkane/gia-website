import "./Contact.css";
import Image from "next/image";

export const Contact = () => {
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
            <form className="contact-form" name="contact" method="POST">
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
                <button type="submit" disabled>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
