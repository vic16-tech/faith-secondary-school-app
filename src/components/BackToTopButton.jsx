import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * BackToTopButton Component
 * A fixed button that appears when the user scrolls down,
 * allowing them to quickly scroll back to the top of the page.
 */
const BackToTopButton = () => {
  // State to control the visibility of the button
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Effect hook to add and remove the scroll event listener
  useEffect(() => {
    /**
     * handleScroll: Checks the scroll position and updates the button's visibility state.
     * The button appears if the user scrolls down more than 300 pixels from the top.
     */
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Cleanup function: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  /**
   * scrollToTop: Scrolls the window smoothly to the top of the page.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Provides a smooth scrolling animation
    });
  };

  // Render the button only if showBackToTop is true
  return (
    <> {/* Using a React Fragment to conditionally render the motion.button */}
      {showBackToTop && (
        <motion.button
          onClick={scrollToTop} // Attach the scroll to top function to the button click
          // Framer Motion animations for button appearance/disappearance
          initial={{ opacity: 0, y: 20 }} // Start slightly off-screen and invisible
          animate={{ opacity: 1, y: 0 }}   // Animate to fully visible and in position
          exit={{ opacity: 0, y: 20 }}    // Animate out when no longer visible
          transition={{ duration: 0.3 }}  // Smooth transition duration

          // Tailwind CSS classes for styling the button
          className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-colors duration-300 z-50 cursor-pointer"
          aria-label="Back to top" // Accessibility label
        >
          {/* SVG icon for the up arrow */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </motion.button>
      )}
    </>
  );
};

export default BackToTopButton;
