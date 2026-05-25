import Hero from "./components/Hero";
import Featured from "./components/Featured";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Featured />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
