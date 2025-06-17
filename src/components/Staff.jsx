import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaBook,
  FaChalkboardTeacher,
  FaDownload,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { staffList } from "./staffData";

const departments = ["All", "Science", "Arts", "Commercial"];

const Staff = () => {
  const [activeDept, setActiveDept] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);

  const filtered = staffList
    .filter((staff) =>
      activeDept === "All" ? true : staff.department === activeDept
    )
    .filter((staff) =>
      staff.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "experience") return b.experience - a.experience;
      if (sortBy === "waec") return b.waecPassRate - a.waecPassRate;
      return 0;
    });

  return (
    <motion.section
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "tween", duration: 1 }}
      className="text-gray-100 py-16 px-6 md:px-20 font-inter overflow-x-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #0f0f0f, #1a2a6c, #f5c6ec)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2 text-white">Meet Our Staff</h2>
        <p className="text-gray-200">Dedicated. Qualified. Impactful.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-3">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-4 py-2 rounded-full border transition whitespace-nowrap ${
                activeDept === dept
                  ? "bg-white text-black font-semibold"
                  : "border-gray-300 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow min-w-[150px] sm:min-w-[250px]">
            <FaSearch className="absolute top-2.5 left-3 text-gray-300" />
            <input
              type="text"
              placeholder="Search teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white w-full"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 text-sm bg-white/10 text-black focus:outline-none focus:ring-white min-w-[140px]"
          >
            <option value="">Sort</option>
            <option value="experience">Most Experienced</option>
            <option value="waec">Top WAEC Pass Rate</option>
          </select>

          <a
            href="/downloads/full-staff-list.pdf"
            className="flex items-center gap-1 text-white font-medium hover:underline whitespace-nowrap"
            download
          >
            <FaDownload /> Staff List
          </a>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((staff, i) => (
          <motion.div
            key={i}
            className="bg-white/10 backdrop-blur-md rounded-lg shadow p-5 hover:shadow-md transition border border-white/10 break-words"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaUserTie className="text-white text-xl flex-shrink-0" />
              <h3 className="text-lg font-semibold text-white truncate">{staff.name}</h3>
            </div>
            <p className="text-sm text-gray-200 mb-1 flex items-center gap-1">
              <FaChalkboardTeacher /> {staff.department}
            </p>
            <p className="text-sm text-gray-200 mb-1 flex items-center gap-1 flex-wrap break-normal">
              <FaBook /> Subjects:{" "}
              <span className="break-words">
                {staff.subjects.join(", ")}
              </span>
            </p>
            <p className="text-sm text-gray-200 mb-2">
              Experience:{" "}
              <span className="font-medium">{staff.experience} yrs</span>
            </p>
            <button
              onClick={() => setSelectedStaff(staff)}
              className="text-white text-sm mt-2 hover:underline"
            >
              View Full Bio
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-8 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full relative text-gray-800 max-h-[90vh] overflow-y-auto"
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedStaff(null)}
              aria-label="Close modal"
            >
              <FaTimes size={18} />
            </button>
            <h3 className="text-xl font-bold mb-2 break-words">{selectedStaff.name}</h3>
            <p className="text-sm mb-2 break-words">
              <strong>Department:</strong> {selectedStaff.department}
            </p>
            <p className="text-sm mb-2 break-words">
              <strong>Subjects:</strong> {selectedStaff.subjects.join(", ")}
            </p>
            <p className="text-sm mb-4 text-gray-600 break-words">{selectedStaff.bio}</p>
            <a
              href={selectedStaff.cv}
              download
              className="flex items-center gap-1 text-indigo-700 text-sm font-medium hover:underline"
            >
              <FaDownload /> Download CV
            </a>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
};

export default Staff;
