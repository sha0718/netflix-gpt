import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MovieList = ({ title, movies }) => {
    const sliderRef = useRef(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="px-6 relative group">
            <h1 className=" text-lg md:text-3xl py-4 text-white">{title}</h1>
            
            {/* Left Arrow Button */}
            <button 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black p-2 rounded-full z-10 
                hidden group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                onClick={scrollLeft}
            >
                <FaChevronLeft className="text-white text-2xl" />
            </button>

            {/* Movie Slider */}
            <div 
                ref={sliderRef} 
                className="flex space-x-4 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory w-full"

                
            >
                {movies?.map((movie) => (
                    <div key={movie.id} className="snap-center">
                        <MovieCard posterPath={movie.poster_path} />
                    </div>
                ))}
            </div>

            {/* Right Arrow Button */}
            <button 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black p-2 rounded-full z-10 
                hidden group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                onClick={scrollRight}
            >
                <FaChevronRight className="text-white text-2xl" />
            </button>
        </div>
    );
};

export default MovieList;
