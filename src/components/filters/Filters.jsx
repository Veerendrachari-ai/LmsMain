import React, { useState } from "react";
import "./filters.css";

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: "",
    duration: "",
    price: "",
    sort: "newest",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="filters">
      <h3>Filters</h3>

      <div className="filter-group">
        <h4>Category</h4>
        <select name="category" onChange={handleChange}>
          <option value="">All</option>
          <option value="workshops">Workshops</option>
          <option value="courses">Course</option>
        </select>
      </div>

      <div className="filter-group">
        <h4>Duration</h4>
        <select name="duration" onChange={handleChange}>
          <option value="">All</option>
          <option value="1weeks">1-Week</option>
          <option value="2weeks">2-Week's</option>
          <option value="3weeks">3-Week's</option>
          <option value="6weeks">6-Week's</option>
        </select>
      </div>

      <div className="filter-group">
        <h4>Price</h4>
        <select name="price" onChange={handleChange}>
          <option value="">All</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div className="filter-group">
        <h4>Sort By</h4>
        <select name="sort" onChange={handleChange}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
