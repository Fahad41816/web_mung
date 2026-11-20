import About from "@/components/HomePageElements/About";
import FaqSection from "@/components/HomePageElements/Faq";
import HeroSection from "@/components/HomePageElements/HeroSection";
import OurLocation from "@/components/HomePageElements/OurLocation";
import OurWorkFlowWithYou from "@/components/HomePageElements/OurWorkFlowWithYou";
import Reviews from "@/components/HomePageElements/Reviews";
import Service from "@/components/HomePageElements/Service";
import WhyUsSection from "@/components/HomePageElements/WhyUs";

export default function Home() {
  return (
    <div className="">
      <main className=" ">
        <HeroSection />
        <About />
        <Service />
        <Reviews />
        <WhyUsSection />
        <OurWorkFlowWithYou/>
        <FaqSection/>
        <OurLocation/>
      </main>
    </div>
  );
}
