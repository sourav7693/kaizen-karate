import { getAllGallery } from '@/actions/gallery';
import AboutSection1 from '@/components/home/AboutSection1'
import AboutSection2 from '@/components/home/AboutSection2';
import AboutSection3 from '@/components/home/AboutSection3';
import AboutSection4 from '@/components/home/AboutSection4';
import EnquiryBoxSection from '@/components/home/EnquiryBoxSection';
import GallerySection from '@/components/home/GallerySection';
import HomeSlider from '@/components/home/HomeSlider';
import InfoSection from '@/components/home/InfoSection';
import TrainingClasses from '@/components/home/TrainingClasses';
import MainTemplate from '@/templates/MainTemplate'

const page = async() => {
  const gallery = await getAllGallery(1,10);
  return (
    <MainTemplate>
      <HomeSlider />
      <section className='self-padding'>
        <InfoSection />
        <AboutSection1 />
        <TrainingClasses />
        <AboutSection2 />
        <AboutSection3 />
        <AboutSection4 />
        <GallerySection Gallery={gallery.data}/>
        <EnquiryBoxSection />
      </section>
    </MainTemplate>
  );
}

export default page