import WaitlistProvider from "@/components/WaitlistProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import UtilitiesSection from "@/components/UtilitiesSection";
import SlottingMechanism from "@/components/SlottingMechanism";
import TestnetCTA from "@/components/TestnetCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <WaitlistProvider>
      <Nav />
      <main>
        <Hero />
        <UtilitiesSection />
        <SlottingMechanism />
        <TestnetCTA />
      </main>
      <Footer />
    </WaitlistProvider>
  );
}
