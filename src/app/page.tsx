import { PasswordGate } from "@/components/auth/PasswordGate";
import { AboutDJ } from "@/components/about-dj/AboutDJ";
import { Contact } from "@/components/contact/Contact";
import { Hero } from "@/components/hero/Hero";
import { Info } from "@/components/info/Info";
import { Releases } from "@/components/releases/Releases";
import { Shows } from "@/components/shows/Shows";

export default function Home() {
  return (
    <PasswordGate>
      <div className="home">
        <Hero />
        <Info />
        <Releases />
        <AboutDJ />
        <Shows />
        <Contact />
      </div>
    </PasswordGate>
  );
}
