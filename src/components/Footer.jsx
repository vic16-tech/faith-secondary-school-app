import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-white bg-gradient-to-r from-black via-blue-900 to-pink-900 px-6 md:px-20 py-16 font-inter"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto font-gro">
        {/* School Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Faith Schools</h2>
          <p className="text-sm text-gray-300">
            Empowering minds through quality education, innovation, and values. Join the journey.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/AboutFaith" className="hover:underline">About</a></li>
            <li><a href="/staff" className="hover:underline">Staff</a></li>
            <li><a href="/admission" className="hover:underline">Admission</a></li>
            <li><a href="/ContactFaith" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <FaPhone /> +234 123 456 7890
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> info@faith.edu.ng
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> KM 7 Gboko Road, Makurdi, Nigeria
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-4">Connect</h3>
          <div className="flex gap-4 text-xl text-gray-300">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-600" />

      <p className="text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Faith Schools. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
