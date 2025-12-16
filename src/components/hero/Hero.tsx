import "./Hero.css";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-logo">
            <Image
              src="/favicon.svg"
              alt="GIA Logo"
              width={400}
              height={400}
              priority
            />
          </div>
        </div>
      </div>
      {/*
      <div className="hero-footer">
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
       */}
    </section>
  );
};
