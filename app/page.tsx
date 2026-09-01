import { BookingProvider } from "@/lib/BookingContext";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Experience3D from "@/components/sections/Experience3D";
import Gallery from "@/components/sections/Gallery";
import BeforeAfter from "@/components/sections/BeforeAfter";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Booking from "@/components/sections/Booking";
import InstagramSection from "@/components/sections/Instagram";
import Location from "@/components/sections/Location";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <BookingProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Experience3D />
        <Gallery />
        <BeforeAfter />
        <WhyChooseUs />
        <Booking />
        <InstagramSection />
        <Location />
        <Contact />
      </main>
      <Footer />
    </BookingProvider>
  );
}
