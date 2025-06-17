// components/StatsCambridge.jsx
import { useEffect, useState } from "react";
import { FaUserGraduate, FaAward, FaChalkboardTeacher, FaHeart, FaGift } from "react-icons/fa";
import { motion } from "framer-motion";
import '../index.css';

const StatCard = ({ icon: Icon, label, target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Choose increment speed based on target number
    const increment = target > 100 ? 2 : 1;
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return prev + increment;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-center bg-white shadow-sm rounded-lg p-6 border border-gray-200"
    >
      <div className="text-3xl text-indigo-700 mb-3">
        <Icon />
      </div>
      <h3 className="text-3xl font-serif font-bold text-gray-900">{count}+</h3>
      <p className="text-sm text-gray-500 mt-2">{label}</p>
    </motion.div>
  );
};

const About= () => {
  return (
    <section className="py-20 px-6 md:px-20 font-serif bg-[#f0f4f8]">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
      >
        School Achievements
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
        <StatCard icon={FaUserGraduate} label="Graduates" target={450} />
        <StatCard icon={FaHeart} label="Lives Touched" target={1200} />
        <StatCard icon={FaAward} label="Awards" target={35} />
        <StatCard icon={FaChalkboardTeacher} label="Teachers" target={50} />
        <StatCard icon={FaGift} label="Scholarships" target={150} />
      </div>
    </section>
  );
};

export default About;
