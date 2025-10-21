import React, { useState, useEffect } from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext.jsx";
import CourseCard from "../../components/coursecard/CourseCard.jsx";
import Filters from "../../components/filters/Filters.jsx";

const Courses = () => {
  const { courses } = CourseData();
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  const handleFilterChange = (filters) => {
    let updated = [...courses];

    if (filters.category) {
      updated = updated.filter((c) =>
        c.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.duration) {
      updated = updated.filter((c) => c.weeks === filters.duration);
    }

    if (filters.price === "free") {
      updated = updated.filter((c) => c.price === 0);
    }
    if (filters.price === "paid") {
      updated = updated.filter((c) => c.price > 0);
    }

    if (filters.sort === "priceLow") {
      updated.sort((a, b) => a.price - b.price);
    }
    if (filters.sort === "priceHigh") {
      updated.sort((a, b) => b.price - a.price);
    }

    if (search.trim() !== "") {
      updated = updated.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredCourses(updated);
  };

  return (
    <div className="courses-page">
      <div className="courses-layout">
        {/* Sidebar */}
        <aside className="courses-sidebar">
          <h3>Filters</h3>
          <Filters onFilterChange={handleFilterChange} />
        </aside>

        {/* Main Content */}
        <main className="courses-main">
          <div className="courses-header">
            <h2>Available Courses</h2>

            <div className="search-box">
              <input
                type="text"
                placeholder="🔍 Search course..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleFilterChange({});
                }}
              />
            </div>
          </div>

          <div className="course-container">
            {filteredCourses && filteredCourses.length > 0 ? (
              filteredCourses.map((e) => (
                <CourseCard key={e._id} course={e} />
              ))
            ) : (
              <p className="no-course">No courses found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Courses;
