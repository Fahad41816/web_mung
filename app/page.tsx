import About from "@/components/HomePageElements/About";
import HeroSection from "@/components/HomePageElements/HeroSection";
import Navbar from "@/components/HomePageElements/Navbar";
import Reviews from "@/components/HomePageElements/Reviews";
import Service from "@/components/HomePageElements/Service";

export default function Home() {
  return (
    <div className="">
      <main className=" ">
        <Navbar />
        <HeroSection />
        <About/>
        <Service/>
        <Reviews/>
      </main>
    </div>
  );
}
