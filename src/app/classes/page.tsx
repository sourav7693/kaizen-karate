"use client";
import SubBanner from '@/components/global/SubBanner';
import MainTemplate from '@/templates/MainTemplate'
import EnquiryBoxSection from '@/components/home/EnquiryBoxSection';
import ClassSection from '@/components/home/ClassSection';

const page = () => {
  
  return (
    <MainTemplate>
      <SubBanner heading="Our Classes" />
      <section className="self-padding">
        <h1 className='text-xl md:text-3xl font-bold text-defined-purple'>Our Training & Classes</h1>
        <ClassSection />
        <EnquiryBoxSection />
      </section>
    </MainTemplate>
  );
}

export default page