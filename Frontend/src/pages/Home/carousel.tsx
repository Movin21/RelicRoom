import React, { useState, useEffect } from "react";
import image1 from "../../assets/carousel/1.png";
import image2 from "../../assets/carousel/2.jpeg";
import image3 from "../../assets/carousel/3.png";
import image4 from "../../assets/carousel/4.jpeg";
import image5 from "../../assets/carousel/5.jpeg";
import image6 from "../../assets/carousel/6.jpeg";
import image7 from "../../assets/carousel/7.jpeg";
import image8 from "../../assets/carousel/8.jpeg";

function Carousel() {
  const slides = [
    { id: 1, url: image1 },
    { id: 2, url: image2 },
    { id: 3, url: image3 },
    { id: 4, url: image4 },
    { id: 5, url: image5 },
    { id: 6, url: image6 },
    { id: 7, url: image7 },
    { id: 8, url: image8 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000); // Switch slides every 5 seconds

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className="relative w-full">
      {/* Slideshow */}
      <div className="overflow-hidden h-[611px] relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 w-full h-full transition-transform duration-500"
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          >
            <img
              src={slide.url}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* Navigation buttons */}
      <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full">
        <button
          onClick={prevSlide}
          className="text-white text-2xl rounded-full p-2 bg-black/20 cursor-pointer"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="text-white text-2xl rounded-full p-2 bg-black/20 cursor-pointer"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 flex justify-center w-full ">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.id}
            onClick={() => goToSlide(slideIndex)}
            className={`text-3xl cursor-pointer ${
              currentIndex === slideIndex ? "text-footertxt" : "text-white"
            }`}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
