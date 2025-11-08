import { Contact } from "@/components/contact/Contact";
import { Hero } from "@/components/hero/Hero";
import { Info } from "@/components/info/Info";
import { Releases } from "@/components/releases/Releases";
import { Shows } from "@/components/shows/Shows";

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Info />
      <Releases />
      <Shows />
      <Contact />
    </div>
  );
}
