import Image from "next/image";
import "./Releases.css";

export const Releases = () => {
  return (
    <section className="releases" id="releases">
      <div className="releases-container">
        <div className="releases-image-section">
          <Image
            src="/releases_image.jpg"
            alt="Latest Release"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="releases-content">
          <div className="featured-release">
            <span className="featured-label">Latest Release</span>
            <h2>Roll the Dice</h2>
            <a
              href="https://open.spotify.com/track/3F56KBHXapK14C2CUX3XRG?si=e5e3465ea8ea49ed"
              target="_blank"
              rel="noopener noreferrer"
              className="listen-link"
            >
              Listen Now →
            </a>
          </div>

          <div className="releases-list">
            <a
              href="https://open.spotify.com/track/2FjZ6y0QnpHFYEiO4dL3n1?si=a80ccf824ec94936"
              target="_blank"
              rel="noopener noreferrer"
              className="release-card"
            >
              <div className="release-details">
                <span className="track-title">Make Me Your Fool</span>
              </div>
              <span className="play-icon">→</span>
            </a>
            <a
              href="https://open.spotify.com/track/56A8vb6OTo3wn954I8XbSe?si=7e4261a287764e8f"
              target="_blank"
              rel="noopener noreferrer"
              className="release-card"
            >
              <div className="release-details">
                <span className="track-title">The One (feat. Vuyo)</span>
              </div>
              <span className="play-icon">→</span>
            </a>
            <a
              href="https://open.spotify.com/track/6RIVgBsE4GLnPgJxb0ZZDU?si=2f8e85e4164e4b44"
              target="_blank"
              rel="noopener noreferrer"
              className="release-card"
            >
              <div className="release-details">
                <span className="track-title">When Night Comes</span>
              </div>
              <span className="play-icon">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
