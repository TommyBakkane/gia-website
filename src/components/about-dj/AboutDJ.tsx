import Image from "next/image";
import "./AboutDJ.css";

export const AboutDJ = () => {
  return (
    <section className="about-dj" id="about-dj">
      <div className="about-dj-container">
        <div className="about-dj-content">
          <div className="about-dj-header">
            <h2>DJ GIA</h2>
          </div>
          <div className="about-dj-text">
            <p>
              DJ GIA ignites the room with her fearless, genre-blending
              style-where sultry South American rhythms meet groovy lounge
              textures and irresistibly funky house. Each performance bursts
              with pulse and personality, punctuated by those perfectly timed
              early-2000s throwbacks that send the crowd over the edge. Always
              performing with a bright smile, her greatest mission is to create
              a confident, electric club atmosphere-one you won&apos;t forget
              anytime soon.
            </p>
          </div>
        </div>
        <div className="about-dj-image-section">
          <Image
            src="/dj_image.jpg"
            alt="GIA DJ"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
};
