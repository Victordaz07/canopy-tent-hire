import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { FeaturesStrip } from '../components/home/FeaturesStrip';
import { GallerySection } from '../components/home/GallerySection';
import { TentsGrid } from '../components/home/TentsGrid';
import { BookingForm } from '../components/booking/BookingForm';
import { ReviewsGrid } from '../components/reviews/ReviewsGrid';

export function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturesStrip />
        <GallerySection />
        <TentsGrid />
        <BookingForm />
        <ReviewsGrid />
      </main>
      <Footer />
    </>
  );
}
