import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Ecosystem from "@/components/Ecosystem";
import Community from "@/components/Community";
import BetaSignup from "@/components/BetaSignup";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Ecosystem />
      <Community />
      <BetaSignup />
    </main>
  );
}
