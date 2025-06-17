import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import BackToTopButton from './BackToTopButton';
import '../index.css';

const HeroSection = () => {
  return (
    <section
      className="relative h-screen bg-center bg-cover bg-no-repeat text-white"
      style={{
        backgroundImage: `url('/hero-cambridge.jpg')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider leading-tight drop-shadow-xl font-inter max-w-xs xs:max-w-sm sm:max-w-md mx-auto"
        >
          FAITH SECONDARY SCHOOL
        </motion.h1>

        {/* Latin motto */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-[0.65rem] xs:text-xs sm:text-sm md:text-base mt-4 max-w-[280px] xs:max-w-xs sm:max-w-sm mx-auto text-gray-200 italic font-inter"
        >
          *“Lux Mentis, Lux Orbis” — The Light of the Mind is the Light of the World.*
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-[0.6rem] xs:text-[0.7rem] sm:text-sm md:text-base mt-6 max-w-[280px] xs:max-w-xs sm:max-w-sm mx-auto text-gray-300"
        >
          A citadel of excellence, discipline, and godly heritage — shaping leaders with timeless values.
        </motion.p>

        {/* Call to Action */}
        <motion.a
          href="/AboutFaith"
          aria-label="Scroll to About Section"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-10 inline-block px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 border border-white text-[0.65rem] xs:text-xs sm:text-sm md:text-base font-semibold uppercase hover:bg-white hover:text-black transition duration-300 tracking-wide rounded"
        >
          Enter the Legacy
        </motion.a>

        {/* Scroll Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="absolute bottom-4 sm:bottom-6"
        >
          <FaArrowDown className="text-white text-lg sm:text-xl animate-bounce" />
        </motion.div>
        <BackToTopButton/>
      </div>
    </section>
  );
};

export default HeroSection;
