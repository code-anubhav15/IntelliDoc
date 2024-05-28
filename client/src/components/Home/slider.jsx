import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import carousel4 from "../../assests/carousel-4.jpg";
import carousel5 from "../../assests/carousel-5.jpeg";
import carousel12 from "../../assests/carousel-12.jpg";
import carousel13 from "../../assests/carousel-13.jpg";
import carousel7 from "../../assests/carousel-7.jpeg";

function Slider() {
  const slides = [
    {
      url: carousel4,
      text: {
        heading: "Empowering Wellness Through",
        span:" Expert Care.",
        content: "Experience vibrant health with expert care. Our seasoned team crafts personalized solutions, igniting vitality and nurturing well-being for your thriving life."
      }
    },
    {
      url: carousel5,
      text: {
        heading: "Comprehensive Care,",
        span:" Compassionate Approach.",
        content: "Embark on a journey of holistic healing with our compassionate experts, providing comprehensive care tailored to your well-being and vitality."
      }
    },
    {
      url: carousel12,
      text: {
        heading: "Where Healing Begins,",
        span:" Hope Flourishes.",
        content: "Discover a sanctuary where healing blossoms, nurturing hope and renewal. Our haven offers solace, guiding you toward flourishing vitality."
      }
    },
    {
      url: carousel13,
      text: {
        heading: "Precision Diagnosis Made ",
        span:"Simple and Quick.",
        content: "Effortlessly attain precise diagnoses with our streamlined process, ensuring simplicity and speed. Experience seamless healthcare excellence, delivering swift clarity and peace of mind."
      }
    },
    {
      url: carousel7,
      text: {
        heading: "Insightful Diagnosis,",
        span:" Brighter Tomorrows.",
        content: "Uncover profound insights for brighter futures. Our diagnostic expertise illuminates paths to optimism, fostering confidence and wellness for tomorrow's brilliance."
      }
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className='max-w-[90vw] h-[80vh] sm:h-[80vh] lg:h-[100vh] w-full my-11 mx-auto py-16 px-4 relative group'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500 -z-100 relative'
      >
      <div className='absolute left-5 top-[40%] transform -translate-y-1/2 text-black text-2xl font-semibold'>
  <h2 className="text-xl sm:text-3xl lg:text-5xl mb-5" style={{ maxWidth: '70%' }}>
  {slides[currentIndex].text.heading}
     <span className='text-blue-600'>{slides[currentIndex].text.span}</span>
  </h2>
  <p className="text-gray-500 text-sm sm:text-lg lg:text-xl" style={{ maxWidth: '55%' }}>{slides[currentIndex].text.content}</p>
</div>


      </div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
