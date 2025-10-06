import Image from "next/image";
import Link from "next/link";


const TrainingClasses = () => {
    const info = [
      {
        title: "Traditional Karate",
        detail:
          "Master the authentic Okinawa Goju-ryu style—a powerful blend of hard and soft techniques. This training builds discipline, respect, balance, and focus, fostering the Kaizen philosophy of continuous self-improvement. Our structured grading system tracks your journey to mastery.",
        imageUrl: "/images/class1.jpg",
      },
      {
        title: "Sports Karate",
        detail:
          "Train to compete and win under KAI-certified national coaches. We prepare athletes for state, national, and international championships, upholding our legacy of success in Japan and Malaysia. Develop speed, agility, and the strategic focus required for competitive excellence.",
        imageUrl: "/images/class2.jpg",
      },
      {
        title: "Self Defence for Women’s",
        detail:
          "Gain the confidence and practical skills necessary to feel secure and independent. Our program teaches crucial self-defense techniques, helps differentiate good/bad touch, and ensures you are physically fit and ready to handle challenging situations effectively.",
        imageUrl: "/images/class3.jpg",
      },      
    ];
  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-defined-purple">
        Our Training and Classes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {info.map((item, index) => (
          <Link href="/classes" key={index} className="border border-[#ccc] bg-radial-to-b from-[#f5f5f5] to-[#ffffff] p-4 rounded-lg shadow-md flex flex-col gap-2 hover:scale-105 transition-transform duration-300">
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={500}
              height={500}
              className="rounded-lg"
            />
            <h2 className="text-lg font-semibold text-defined-purple">
                {item.title}
            </h2>
            <p className="text-defined-brown">
                {item.detail}
            </p>
            <span className="text-defined-purple font-semibold">Enroll Now</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default TrainingClasses