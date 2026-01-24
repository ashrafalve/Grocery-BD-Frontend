import React, { useState, useEffect } from 'react';

interface SlideBannerProps {
    slides: Array<{
        id: number;
        title: string;
        subtitle: string;
        buttonText: string;
        image?: string;
        backgroundColor?: string;
    }>;
}

const SlideBanner: React.FC<SlideBannerProps> = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    if (slides.length === 0) return null;

    const slide = slides[currentSlide];

    return (
        <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-lg">
            {/* Main Slide */}
            <div 
                className={`transition-all duration-1000 ease-in-out min-h-[200px] sm:min-h-[300px] md:min-h-[400px] flex items-center justify-center ${slide.backgroundColor || 'bg-gradient-to-r from-primary-500 to-primary-600'}`}
            >
                <div className="text-center px-4 sm:px-6 md:px-8 py-8 sm:py-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 animate-fadeIn">
                        {slide.title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-green-100 mb-6 sm:mb-8 animate-fadeIn">
                        {slide.subtitle}
                    </p>
                    <button className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold transition-all duration-200 text-sm sm:text-base animate-fadeIn">
                        {slide.buttonText}
                    </button>
                </div>
            </div>

            {/* Navigation Dots */}
            {slides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide 
                                    ? 'bg-white scale-125' 
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Arrow Navigation */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-colors"
                        aria-label="Previous slide"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-colors"
                        aria-label="Next slide"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
};

export default SlideBanner;