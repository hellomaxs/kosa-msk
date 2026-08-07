import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Claims } from "@/components/Claims";
import { Lengths } from "@/components/Lengths";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Claims />
        <Lengths />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
