import { AboutDJ } from "@/components/about-dj/AboutDJ";
import { Contact } from "@/components/contact/Contact";
import { Countdown } from "@/components/countdown/Countdown";
import { Info } from "@/components/info/Info";
import { Releases } from "@/components/releases/Releases";
import { Shows } from "@/components/shows/Shows";

export default function Home() {
  return (
    <div className="home">
      <Countdown />
      <Info />
      <Releases />
      <Shows />
      <AboutDJ />
      <Contact />
    </div>
  );
}
