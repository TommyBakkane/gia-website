import Image from "next/image";
import "./Info.css";

export const Info = () => {
  return (
    <section className="info" id="info">
      <div className="info-container">
        <div className="info-section left">
          <div className="info-header">
            <div className="info-top">
              <div className="image-container">
                <Image
                  src="/logo.svg"
                  alt="GIA"
                  className="info-logo"
                  width={120}
                  height={120}
                />
              </div>
              <p className="vertical-text">Singer and DJ</p>
            </div>
          </div>
          <div className="about-section">
            <p>
              Praised by VG for “a definite talent for soft, atmospheric soul”
              and hailed by Dagsavisen as “one of Norway’s most promising voices
              in modern R&B,” GIA creates music where raw confidence meets
              emotional honesty. With roots in jazz and a sound merging
              electronic textures with organic warmth, she explores themes of
              power, love, and identity through a sharp, feminist
              lens—delivering songs that move both body and mind.
            </p>
          </div>
        </div>
        <div className="info-section right">
          <img src="/about_image.jpg" alt="GIA" />
        </div>
      </div>
    </section>
  );
};
